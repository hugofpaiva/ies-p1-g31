package com.storego.storegoservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * When this exception is thrown, Spring will respond with the status defined and the message
 */
@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class EtAuthException extends RuntimeException{

    public EtAuthException(String message){
        super(message);
    }
}
