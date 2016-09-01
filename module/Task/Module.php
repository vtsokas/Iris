<?php

namespace Task;

use Task\Model\Task;
use Task\Model\TaskRepository;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;

class Module
{
    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }

    public function getAutoloaderConfig()
    {
        return [
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                ),
            ),
        ];
    }

    public function getServiceConfig()
    {
        return array(
            'factories' => array(
                'task_repository' =>  function($sm) {
                    $dbAdapter = $sm->get('DBAdapter');
                    $table = new TaskRepository($dbAdapter);
                    return $table;
                },
                'DBAdapter' => function ($sm) {
                    $dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
                    return $dbAdapter;
                }
            ),
        );
    }
}