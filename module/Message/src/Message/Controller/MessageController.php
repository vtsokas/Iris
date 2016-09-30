<?php

namespace Message\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class MessageController extends AbstractActionController
{
    public function indexAction()
    {//var_dump($this->getServiceLocator()->get("role_service")->getUserRole());die();
        return new ViewModel();
    }
}