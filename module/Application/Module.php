<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2015 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Application;

//use Application\Service\RoleService;
use Zend\Mvc\ModuleRouteListener;
use Zend\Mvc\MvcEvent;
use Zend\Stdlib\Parameters;

class Module
{
    public function onBootstrap(MvcEvent $e)
    {
        $eventManager        = $e->getApplication()->getEventManager();
        $moduleRouteListener = new ModuleRouteListener();
        $moduleRouteListener->attach($eventManager);

        $eventManager->attach(MvcEvent::EVENT_ROUTE, array($this, 'onRoute'));
    }

    public function onRoute(MvcEvent $e){
        return;
        $request = $e->getRequest();

        if ($request->isPost()){
            $data = $request->getPost();
        } elseif($request->isGet()){
            $data = $request->getQuery();
        } else {
            return;
        }

        $newData = array();
        $isJson = true;

        foreach($data->toArray() as $key => $value){
            if (is_string($value)) {
                $dec = json_decode($value, true);
                if ($dec && $isJson) {
                    $newData[$key] = $dec;
                } else {
                    $isJson = false;
                }
            }
        }

        if (!$isJson) return;

        $params = new Parameters($newData);

        if ($request->isGet()) $request->setQuery($params);
        else $request->setPost($params);
    }

    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }

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
}
