<?php

namespace Verber\TodoBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations as Rest;
//use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DefaultController
{
    /**
     * @Rest\View(templateVar="tasks")
     */
    public function indexAction()
    {
        $tasks = array(
            array(
                'title' => 'Learn&practice with Ember',
                'status' => "In progress",
                'deadline' => '2012-11-20'
            ),
            array(
                'title' => 'Learn noSQL',
                'status' => "In progress",
                'deadline' => '2012-11-20'
            ),
            array(
                'title' => 'Profit!',
                'status' => "Not started",
                'deadline' => '2012-11-20'
            ),
        );

        return $tasks;
    }
}
