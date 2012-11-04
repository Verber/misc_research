<?php
$out = array();
$out = array(
    'success' => false,
    'message' => "Can't load redis module.",
    'data' => array()
);
$redis=new Redis();
if ($redis) {
    $out['message'] = "Can't connect to redis at 127.0.0.1";
    if ($redis->connect('127.0.0.1')) {
        $id = $redis->incr('posts_counter');
        $key = 'post_' . $id;
        $post = json_encode($_POST);
        $out['message'] = sprintf(
            "Can't write to redis key %s value %s",
            $key,
            $post
        );
        if ($redis->set($key, $post)) {
            //get data
            $out['message'] = "Keys post_* not found";
            $keys = $redis->keys('post_*');
            if (count($keys)) {
                $values = array();
                foreach ($keys as $key) {
                    $values[] = array(
                        'key' => $key,
                        'value' => json_decode($redis->get($key))
                    );
                }
                $out['success'] = true;
                $out['message'] = "OK";
                $out['data'] = $values;
            }
        }
    }
    $redis->close();
}
echo json_encode($out);