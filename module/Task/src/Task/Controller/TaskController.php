<?php

namespace Task\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class TaskController extends AbstractActionController
{
    public function indexAction()
    {
        return new ViewModel();
    }
}