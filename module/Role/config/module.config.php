<?

return array(

    'controllers' => array(
        'invokables' => array(
            'Role\Controller\RoleJson' => 'Role\Controller\RoleJsonController'
        ),
    ),

    'router' => array(
        'routes' => array(
            'role-json' => array(
                'type'    => 'segment',
                'options' => array(
                    'route'    => '/role-json[/:action][/:id]',
                    'constraints' => array(
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                        'id'     => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller' => 'Role\Controller\RoleJson'
                    ),
                ),
            ),
        ),
    ),
);