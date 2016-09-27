<?

namespace Message\Model;

use Zend\Db\Adapter\Adapter;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\Sql\Sql;

class MessageCorrelationRepository
{
    const TABLE_NAME = "message_correlation";

    public function insert(MessageCorrelation $messageCorrelation)
    {
        $data = $messageCorrelation->getMessageCorrelationDataArray();
        unset($data['id']);
        $messageCorrelation->setId(\MyAlias::table(self::TABLE_NAME)->insert($data));
        return $messageCorrelation;
    }

}
