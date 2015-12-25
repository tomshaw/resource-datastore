<?php
return array(
    'HTMLPurifier' => array(
        'config' => array(
            'Cache.SerializerPath' => APPLICATION_PATH . '/data/cache/htmlpurifier',
            'Core.Encoding' => 'UTF-8',
            'AutoFormat.RemoveEmpty' => true,
            'HTML.Allowed' => 'p,b,i,u,s,ul,ol,li,blockquote,h1,h2,h3,h5,h5,h6,address,pre,div'
        )
    )
);