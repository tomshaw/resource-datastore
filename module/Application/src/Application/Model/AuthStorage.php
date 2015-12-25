<?php

namespace Application\Model;

use Zend\Authentication\Storage;

class AuthStorage extends Storage\Session
{

    public function setRememberMe($rememberMe = 0, $time = 1209600)
    {
        if ($rememberMe == 1) {
            $this->session->getManager()->rememberMe($time);
        }
    }

    public function forgetMe()
    {
        $this->session->getManager()->forgetMe();
    }

    public function lastLogin()
    {
        $this->session->{$this->getMember()}->last_login = time();
    }
    
}
