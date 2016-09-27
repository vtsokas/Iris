<?

namespace Message;


use Message\Model\MessageRepository;
use Message\Model\MessageCorrelationRepository;
use Message\Model\MessageService;

class Module
{
    public function getAutoloaderConfig()
    {
        return array(
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                ),
            ),
        );
    }

    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }

    public function getServiceConfig()
    {
        return array(
            'factories' => array(
                'message_repository' => function(){
                    return new MessageRepository();
                },
                'messageCorrelation_repository' => function(){
                    return new MessageCorrelationRepository();
                },
                'message_service' =>  function($sm) {
                    $service = new MessageService();
                    $service->setMessageRepository($sm->get('message_repository'));
                    $service->setMessageCorrelationRepository($sm->get('messageCorrelation_repository'));
                    return $service;
                }
            ),
        );
    }
}