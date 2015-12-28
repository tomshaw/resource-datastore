<?php

return array(
    'controllers' => array(
        'invokables' => array(
            'Admin\Controller\Admin' => 'Admin\Controller\AdminController',
            'Admin\Controller\Resource' => 'Admin\Controller\ResourceController',
            'Admin\Controller\Activity' => 'Admin\Controller\ActivityController'
        )
    ),
    'router' => array(
        'routes' => array(
            'admin' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route' => '/admin',
                    'defaults' => array(
                        'controller' => 'Admin\Controller\Admin',
                        'action' => 'index'
                    )
                )
            ),
            'admin-dashboard-data' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route' => '/admin/dashboard',
                    'defaults' => array(
                        'controller' => 'Admin\Controller\Admin',
                        'action' => 'data'
                    )
                )
            ),
            'admin-activity' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route' => '/admin/activity',
                    'defaults' => array(
                        'controller' => 'Admin\Controller\Activity',
                        'action' => 'index'
                    )
                )
            ),
            'admin-activity-data' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route' => '/admin/activity/data',
                    'defaults' => array(
                        'controller' => 'Admin\Controller\Activity',
                        'action' => 'data'
                    )
                )
            ),
            'admin-resource' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/admin/resource[/parent_id/:parent_id]',
                    'constraints' => array(
                        'parent_id' => '[0-9]+'
                    ),
                    'defaults' => array(
                        'controller' => 'Admin\Controller\Resource',
                        'action' => 'index'
                    )
                )
            ),
            'admin-resource-create' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/admin/resource/create[/parent_id/:parent_id]',
                    'constraints' => array(
                        'parent_id' => '[0-9]+'
                    ),
                    'defaults' => array(
                        'controller' => 'Admin\Controller\Resource',
                        'action' => 'create'
                    )
                )
            ),
            'admin-resource-edit' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/admin/resource/edit[/id/:id/parent_id/:parent_id]',
                    'constraints' => array(
                        'id' => '[0-9]+',
                        'parent_id' => '[0-9]+'
                    ),
                    'defaults' => array(
                        'controller' => 'Admin\Controller\Resource',
                        'action' => 'edit'
                    )
                )
            ),
            'admin-resource-delete' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/admin/resource/delete[/id/:id]',
                    'constraints' => array(
                        'id' => '[0-9]+'
                    ),
                    'defaults' => array(
                        'controller' => 'Admin\Controller\Resource',
                        'action' => 'delete'
                    )
                )
            ),
        )
    ),
    'view_manager' => array(
        'template_map' => array(
            'admin/navbar' => __DIR__ . '/../view/admin/partials/navbar.phtml',
            'admin/messages' => __DIR__ . '/../view/admin/partials/messages.phtml'
        ),
        'template_path_stack' => array(
            'admin' => __DIR__ . '/../view'
        )
    )
);
