<?php

namespace Verber\TodoBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class DefaultControllerTest extends WebTestCase
{
    public function testIndex()
    {
        $client = static::createClient();

        $client->request('GET', '/tasks.json');
        $response = $client->getResponse()->getContent();
        $response_array = json_decode($response, true);

        $this->assertArrayHasKey('title', $response_array[0]);
    }
}
