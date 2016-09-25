<?php
return array(
    'controllers' => array(
        'invokables' => array(
            'Message\Controller\Message' => 'Message\Controller\MessageController',
            'Message\Controller\MessageJson' => 'Message\Controller\MessageJsonController'
        ),
    ),

    // The following section is new and should be added to your file
    'router' => array(
        'routes' => array(
            'message' => array(
                'type'    => 'segment',
                'options' => array(
                    'route'    => '/mail[/:action][/:id]',
                    'constraints' => array(
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                        'id'     => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller' => 'Message\Controller\Message',
                        'action' => 'index'
                    ),
                ),
            ),
            'message-json' => array(
                'type'    => 'segment',
                'options' => array(
                    'route'    => '/message-json[/:action][/:id]',
                    'constraints' => array(
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                        'id'     => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller' => 'Message\Controller\MessageJson'
                    ),
                ),
            ),
        ),
    ),

    'view_manager' => array(
        'template_path_stack' => array(
            'task' => __DIR__ . '/../view',
        ),
        'strategies' => array(
            'ViewJsonStrategy',
        ),
    ),
);