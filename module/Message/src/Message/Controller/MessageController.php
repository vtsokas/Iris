<?php

namespace Message\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class MessageController extends AbstractActionController
{
    public function indexAction()
    {
        return new ViewModel();
    }
}