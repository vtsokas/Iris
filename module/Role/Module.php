<?

namespace Role;

use Role\Service\RoleService;
use Role\View\Helper\IsAllowed;

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

    public function getServiceConfig(){
        return array(
            "factories" => array(
                "role_service" => function($sm){
                    $service = new RoleService();
                    $service->setAuthService($sm->get("zfcuser_auth_service"));
                    $service->setRoles(file_get_contents(__DIR__ . "/config/roles.json"));
                    return $service;
                }
            )
        );
    }

    public function getViewHelperConfig()
    {
        return array(
            'factories' => array(
                'isAllowed' => function($sm){
                    $helper = new IsAllowed();
                    $helper->setRoleService($sm->getServiceLocator()->get("role_service"));
                    return $helper;
                }
            ),
        );
    }
}