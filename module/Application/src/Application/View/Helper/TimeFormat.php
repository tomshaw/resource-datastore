<?php
namespace Application\View\Helper;

use Zend\View\Helper\AbstractHelper;

/*<span>just now</span>
<span>4 minutes ago</span>
<span>23 minutes ago</span>
<span>46 minutes ago</span>
<span>1 hour ago</span>
<span>2 hours ago</span>
<span>yesterday</span>
<span>two days ago</span>*/

class TimeFormat extends AbstractHelper
{
    public function __invoke($datetime)
    {
        $now = strtotime("now");
        
        $timestamp = strtotime($datetime);
        
        $diff = $now - $timestamp;
        
        $minute     = 60;
        $hour       = $minute * 60;
        $day        = $hour * 24;
        $week       = $day * 7;
        
        if (is_numeric($diff) && $diff > 0) {
            
            if ($diff < 30) {
                return "just now";
            }
            
            if ($diff < $minute) {
                return floor($diff) . " seconds ago";
            }
            
            if ($diff < $minute * 2) {
                return "about 1 minute ago";
            }
            
            if ($diff < $hour) {
                return floor($diff / $minute) . " minutes ago";
            }
            
            if ($diff < $hour * 2) {
                return "about 1 hour ago";
            }
            
            if ($diff < $day) {
                return floor($diff / $hour) . " hours ago";
            }
            
            if ($diff > $day && $diff < $day * 2) {
                return "yesterday";
            }
            
            if ($diff < $day * 365) {
                return floor($diff / $day) . " days ago";
            }
            
            if ($diff == $week) {
                return "a week ago";
            }
            
            return "over a year ago";
        }
    }
}
