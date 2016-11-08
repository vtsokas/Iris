<?

namespace Message\Model;


class MessageRepository
{
    const TABLE_NAME = "message";

    public function __construct()
    {

    }


    /**
     * Finds all inbox messages for user based on their id
     *
     * @param $messageIds
     * @return mixed
     */
    public function getInboxMessages($messageIds, $userRole, $params)
    {

        $query = \DB::table(self::TABLE_NAME)
            ->select('message.msg_id', 'subject', 'type', 'isRead', 'dateAdded', 'sender_office', 'sender_user');
            //->select(\DB::raw('CONCAT_WS(" - ", message.sender_office, message.sender_user) AS sender'));

        $this->addFilterStatement($query, $params);

        $query->join('message_correlation', 'message_correlation.msg_id', '=', self::TABLE_NAME.'.msg_id')
            ->where('message_correlation.office', '=', $userRole)
            ->whereIn(self::TABLE_NAME.'.msg_id', $messageIds)
            ->orderBy('dateAdded', 'DESC')
            ->offset($params['pagenum'] * $params['pagesize'])
            ->limit($params['pagesize']);


        $result = $query->get();
        return $result;
    }

    /**
     * Finds all outbox messages
     *
     * @param $userRole
     * @return mixed
     */
    public function getOutboxOrDraftMessages($userRole, $userName, $pagenum, $pagesize, $flag)
    {
        if ($flag == 'true'){
            $flag = true;
        }
        else{
            $flag = false;
        }
        $query = \DB::table(self::TABLE_NAME)
            ->select('message.msg_id','type','subject','dateAdded')
            ->select(\DB::raw('message_correlation.msg_id, GROUP_CONCAT(DISTINCT office) AS receiver'))
            ->join('message_correlation', 'message_correlation.msg_id', '=', self::TABLE_NAME.'.msg_id')
            ->where('sender_office',$userRole)
            ->where('sender_user',$userName)
            ->where(self::TABLE_NAME.'.isDeleted', false)
            ->where(self::TABLE_NAME.'.isSent', $flag)
            ->groupBy('message_correlation.msg_id')
            ->orderBy('dateAdded', 'DESC')
            ->offset($pagenum * $pagesize)
            ->limit($pagesize);
        $result = $query->get();
        return $result;
    }

    public function getTotalOutboxOrDrafts($userRole, $userName, $flag)
    {
        if ($flag == 'true'){
            $flag = true;
        }
        else{
            $flag = false;
        }
        $query = \DB::table(self::TABLE_NAME)
            ->where('sender_office', $userRole)
            ->where('sender_user',$userName)
            ->where('isDeleted', false)
            ->where('isSent', $flag);
        $result = $query->count();

        return $result;
    }

    /**
     * {@inheritDoc}
     */
    public function getMessage($id)
    {
        $query = \DB::table(self::TABLE_NAME)
            ->select('msgBody')
            ->where('msg_id',$id);
        $result = $query->get();
        return $result;
    }

    public function updateMessageIsDeletedState( $id){
        $data = array(
            'isDeleted' => true
        );
        \DB::table(self::TABLE_NAME)
            ->where('msg_id', $id)
            ->update($data);
    }

    public function insert($message, $qb)
    {
        $message->setDateAdded(gmdate("Y-m-d H:i:s"));
        $data = $message->toArray();
        unset($data['id']);
        $message->setId($qb->table('message')->insert($data));
        return $message;
    }

    public function update(Message $message)
    {

    }

    /**
     * @TODO add Sorting Statements to query if requested
     * @param $query
     */
    private function addSortingStatement(&$query, $params)
    {

    }

    /**
     * @TODO add Filter Statements to query if requested
     * @param $query
     */
    private function addFilterStatement(&$query, $params)
    {
        if (isset($params['filterscount']))
        {
            if ($params['filterscount'] > 0)
            {
                $GroupStatements = array();
                $firstfilter = true;
                $count = 0;

                $tmpdatafield = "";

                for ($i = 0; $i < $params['filterscount']; $i++)
                {
                    if ($firstfilter) //if this is the first filter just create it
                    {
                        array_push($GroupStatements, $this->filterConditionBuilder($params["filterdatafield" . $i],
                            $params["filtercondition" . $i], $params["filtervalue" . $i], $params["filteroperator" . $i]));
                        $firstfilter = false;
                    }
                    else
                    {
                        if ($tmpdatafield == $params["filterdatafield" . $i]) //if datafield is the same as previous, just create the filter
                        {
                            array_push($GroupStatements, $this->filterConditionBuilder($params["filterdatafield" . $i],
                                $params["filtercondition" . $i], $params["filtervalue" . $i], $params["filteroperator" . $i]));
                        }
                        else //if datafield changed, create 'where clause', empty the array with statements and create the new one
                        {
                            $this->whereClauseBuilder($query, $GroupStatements);

                            $GroupStatements = array(); //empty array for the next group

                            array_push($GroupStatements, $this->filterConditionBuilder($params["filterdatafield" . $i],
                                $params["filtercondition" . $i], $params["filtervalue" . $i], $params["filteroperator" . $i]));
                        }
                    }
                    if ($i == $params['filterscount'] - 1) //if this is the last
                    {
                        $this->whereClauseBuilder($query, $GroupStatements);
                    }
                    $tmpdatafield = $params["filterdatafield" . $i];
                }
            }
        }
    }

    private function whereClauseBuilder(&$query, $GroupStatements)
    {
        $query->where(function($q) use ($GroupStatements)
        {
            foreach ($GroupStatements as $statement)
            {
                //var_dump($statement);
                if ($statement['operator'] == 0)
                {
                    $q->where($statement['fieldname'], $statement['condition'], $statement['value']);
                }
                else
                {
                    $q->orWhere($statement['fieldname'], $statement['condition'], $statement['value']);
                }
            }
        });
    }

    private function filterConditionBuilder($datafield, $filtercondition, $value, $filteroperator)
    {
        $tmpStatementValues = array(
            'fieldname' => "",
            'condition' => "",
            'value' => "",
            'operator' => ""
        );
        switch ($filtercondition)
        {
            case "CONTAINS":
                $tmpStatementValues['condition'] = " LIKE ";
                $tmpStatementValues['value'] = "%{$value}%";
                break;
            case "DOES_NOT_CONTAIN":
                $tmpStatementValues['condition'] = " NOT LIKE ";
                $tmpStatementValues['value'] = "%{$value}%";
                break;
            case "EQUAL":
                $tmpStatementValues['condition'] = " = ";
                $tmpStatementValues['value'] = $value;
                break;
            case "NOT_EQUAL":
                $tmpStatementValues['condition'] = " <> ";
                $tmpStatementValues['value'] = $value;
                break;
            case "GREATER_THAN":
                $tmpStatementValues['condition'] = " > ";
                $tmpStatementValues['value'] = $value;
                break;
            case "LESS_THAN":
                $tmpStatementValues['condition'] = " < ";
                $tmpStatementValues['value'] = $value;
                break;
            case "GREATER_THAN_OR_EQUAL":
                $tmpStatementValues['condition'] = " >= ";
                $tmpStatementValues['value'] = $value;
                break;
            case "LESS_THAN_OR_EQUAL":
                $tmpStatementValues['condition'] = " <= ";
                $tmpStatementValues['value'] = $value;
                break;
            case "STARTS_WITH":
                $tmpStatementValues['condition'] = " LIKE ";
                $tmpStatementValues['value'] = "{$value}%";
                break;
            case "ENDS_WITH":
                $tmpStatementValues['condition'] = " LIKE ";
                $tmpStatementValues['value'] = "%{$value}";
                break;
            case "NULL":
                $tmpStatementValues['condition'] = " IS NULL ";
                $tmpStatementValues['value'] = "%{$value}%";
                break;
            case "NOT_NULL":
                $tmpStatementValues['condition'] = " IS NOT NULL ";
                $tmpStatementValues['value'] = "%{$value}%";
                break;
        }
        $tmpStatementValues['fieldname'] = $datafield;
        $tmpStatementValues['operator'] = $filteroperator;

        return $tmpStatementValues;
    }
}