<?php

namespace ZfcUser\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class UserAdminController extends AbstractActionController
{

    protected $userService;
    protected $roleService;

    public function indexAction()
    {
        if (!$this->getRoleService()->isAllowed("SUPER ADMINISTRATOR")){
            return $this->redirect()->toRoute("zfcuser");
        }

        return new ViewModel(array(
            'users' => $this->getUserService()->getUserMapper()->findAll(),
            'roles' => $this->getRoleService()->getRoleTree()
        ));
    }

    public function resetPasswordAction()
    {
        if (!$this->getRoleService()->isAllowed("SUPER ADMINISTRATOR")){
            return $this->redirect()->toRoute("zfcuser");
        }

        $id = $this->getRequest()->getQuery("id", false);
        $user = $this->getUserService()->getUserMapper()->findById($id);

        $user->setPassword('$2y$14$iwCsxUoetUyqJkZVrYoteOzNF7nffRk5mxIGbP91XrERFlw92nbRS');

        $this->getUserService()->getUserMapper()->update($user);

        return $this->redirect()->toRoute("zfcuser-admin");
    }

    public function changeRoleAction()
    {
        if (!$this->getRoleService()->isAllowed("SUPER ADMINISTRATOR")){
            return $this->redirect()->toRoute("zfcuser");
        }

        $id = $this->getRequest()->getQuery("id", false);
        $role = $this->getRequest()->getQuery("role", false);

        $user = $this->getUserService()->getUserMapper()->findById($id);
        $user->setRole($role);

        $this->getUserService()->getUserMapper()->update($user);

        return $this->redirect()->toRoute("zfcuser-admin");
    }

    public function disableAction()
    {
        if (!$this->getRoleService()->isAllowed("SUPER ADMINISTRATOR")){
            return $this->redirect()->toRoute("zfcuser");
        }

        $id = $this->getRequest()->getQuery("id", false);
        $user = $this->getUserService()->getUserMapper()->findById($id);

        $user->setState(0);

        $this->getUserService()->getUserMapper()->update($user);

        return $this->redirect()->toRoute("zfcuser-admin");
    }

    public function getUserService()
    {
        if (!$this->userService) {
            $this->userService = $this->getServiceLocator()->get('zfcuser_user_service');
        }
        return $this->userService;
    }

    public function getRoleService()
    {
        if (!$this->roleService) {
            $this->roleService = $this->getServiceLocator()->get('role_service');
        }
        return $this->roleService;
    }
}