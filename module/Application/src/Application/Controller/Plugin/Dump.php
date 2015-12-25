<?php

namespace Application\Controller\Plugin;

use Zend\Mvc\Controller\Plugin\AbstractPlugin;
use Zend\Debug\Debug;

class Dump extends AbstractPlugin
{
    public function __invoke($var, $label = null, $echo = true, $exit = false)
    {
        if ($exit) {
            Debug::dump($var, $label = null, $echo = true);
            return exit($exit);
        }
        return Debug::dump($var, $label = null, $echo = true);
    }
}
