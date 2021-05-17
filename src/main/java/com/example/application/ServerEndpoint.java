package com.example.application;

import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.connect.auth.AnonymousAllowed;
import com.vaadin.flow.server.connect.exception.EndpointException;

@Endpoint
@AnonymousAllowed
public class ServerEndpoint {

  public String saveUser(String name) {
    try {
      Thread.sleep(6000);
      return name;
    } catch (InterruptedException e) {
      e.printStackTrace();
      throw new EndpointException("Failed to save");
    }
  }
}
