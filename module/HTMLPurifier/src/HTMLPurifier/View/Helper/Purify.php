<?php

namespace HTMLPurifier\View\Helper;

use Zend\View\Helper\AbstractHelper;

class Purify extends AbstractHelper
{
    protected $purifier;

    public function __construct(\HTMLPurifier $purifier)
    {
        $this->purifier = $purifier;
    }

    public function __invoke($str)
    {
        return $this->purifier->purify($str);
    }
}
