<?php
return array(
    'controllers' => array(
        'invokables' => array(
            'Task\Controller\TaskJson' => 'Task\Controller\TaskJsonController',
            'Task\Controller\Task' => 'Task\Controller\TaskController'
        ),
    ),

    // The following section is new and should be added to your file
    'router' => array(
        'routes' => array(
            'task' => array(
                'type'    => 'segment',
                'options' => array(
                    'route'    => '/scheduler[/:action][/:id]',
                    'constraints' => array(
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                        'id'     => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller' => 'Task\Controller\Task',
                        'action' => 'index'
                    ),
                ),
            ),
            'task-json' => array(
                'type'    => 'segment',
                'options' => array(
                    'route'    => '/task-json[/:action][/:id]',
                    'constraints' => array(
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                        'id'     => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller' => 'Task\Controller\TaskJson'
                    ),
                ),
            ),
        ),
    ),

    'view_manager' => array(
        'template_path_stack' => array(
            'scheduler' => __DIR__ . '/../view',
        ),
        'strategies' => array(
            'ViewJsonStrategy',
        ),
    ),
);