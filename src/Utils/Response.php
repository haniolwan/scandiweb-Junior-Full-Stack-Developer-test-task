<?php

namespace App\Utils;

class Response
{
    private $status;
    private $message;
    private $data;


    public function __construct($status = 'success', $message = '', $data = null)
    {
        $this->status = $status;
        $this->message = $message;
        $this->data = $data;


        $this->setHeaders();
    }

    private function setHeaders()
    {
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
        header('Access-Control-Allow-Headers: Content-Type');
    }


    public function setMessage($message)
    {
        $this->message = $message;
    }

    public function setData($data)
    {
        $this->data = $data;
    }

    public function toArray()
    {
        return [
            'status' => $this->status,
            'message' => $this->message,
            'data' => $this->data
        ];
    }

    public function toJson()
    {
        return json_encode($this->toArray());
    }

    public static function success($message = 'Request successful', $data = null)
    {
        return new self('success', $message, $data);
    }

    public static function error($message = 'Something went wrong', $data = null)
    {
        return new self('error', $message, $data);
    }
}
