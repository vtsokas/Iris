<?

use Zend\Db\Adapter\Adapter;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\Sql\Sql;

class MessageCorrelationRepository implements MessageRepositoryInterface
{
    const TABLE_NAME = "message_correlation";

    public function insert(MessageCorrelation $messageCorrelation)
    {
        $data = $messageCorrelation->getMessageCorrelationDataArray();
        unset($data['id']);
        $messageCorrelation->setId(\MyAlias::table(TABLE_NAME)->insert($data));
        return $messageCorrelation;
    }

}
