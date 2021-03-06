<?php

return array(
    'view_manager' => array(
        'template_path_stack' => array(
            'zfcuser' => __DIR__ . '/../view',
            'zfcuser-admin' => __DIR__ . '/../view'
        ),
    ),
    'service_manager' => array(
        'aliases' => array(
            'zfcuser_zend_db_adapter' => 'Zend\Db\Adapter\Adapter',
        ),
    ),
    'router' => array(
        'routes' => array(
            'zfcuser' => array(
                'type' => 'Literal',
                'priority' => 1000,
                'options' => array(
                    'route' => '/user',
                    'defaults' => array(
                        'controller' => 'zfcuser',
                        'action'     => 'index',
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'login' => array(
                        'type' => 'Literal',
                        'options' => array(
                            'route' => '/login',
                            'defaults' => array(
                                'controller' => 'zfcuser',
                                'action'     => 'login',
                            ),
                        ),
                    ),
                    'authenticate' => array(
                        'type' => 'Literal',
                        'options' => array(
                            'route' => '/authenticate',
                            'defaults' => array(
                                'controller' => 'zfcuser',
                                'action'     => 'authenticate',
                            ),
                        ),
                    ),
                    'logout' => array(
                        'type' => 'Literal',
                        'options' => array(
                            'route' => '/logout',
                            'defaults' => array(
                                'controller' => 'zfcuser',
                                'action'     => 'logout',
                            ),
                        ),
                    ),
                    'register' => array(
                        'type' => 'Literal',
                        'options' => array(
                            'route' => '/register',
                            'defaults' => array(
                                'controller' => 'zfcuser',
                                'action'     => 'register',
                            ),
                        ),
                    ),
                    'changepassword' => array(
                        'type' => 'Literal',
                        'options' => array(
                            'route' => '/change-password',
                            'defaults' => array(
                                'controller' => 'zfcuser',
                                'action'     => 'changepassword',
                            ),
                        ),
                    ),
                    'changeemail' => array(
                        'type' => 'Literal',
                        'options' => array(
                            'route' => '/change-email',
                            'defaults' => array(
                                'controller' => 'zfcuser',
                                'action' => 'changeemail',
                            ),
                        ),
                    ),
                ),
            ),
            'zfcuser-admin' => array(
                'type' => 'Literal',
                'priority' => 1000,
                'options' => array(
                    'route' => '/user-admin',
                    'defaults' => array(
                        'controller' => 'zfcuser-admin',
                        'action'     => 'index',
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'change-role' => array(
                        'type' => 'Literal',
                        'options' => array(
                            'route' => '/change-role',
                            'defaults' => array(
                                'controller' => 'zfcuser-admin',
                                'action'     => 'changeRole',
                            ),
                        ),
                    ),
                    'reset-password' => array(
                        'type' => 'Literal',
                        'options' => array(
                            'route' => '/reset-password',
                            'defaults' => array(
                                'controller' => 'zfcuser-admin',
                                'action'     => 'resetPassword',
                            ),
                        ),
                    ),
                    'disable' => array(
                        'type' => 'Literal',
                        'options' => array(
                            'route' => '/disable',
                            'defaults' => array(
                                'controller' => 'zfcuser-admin',
                                'action'     => 'disable',
                            ),
                        ),
                    )
                ),
            ),
        ),
    ),
);
