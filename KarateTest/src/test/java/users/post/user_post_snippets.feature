@ignore
Feature: Reusable scenarios for post a product

  @Create
  Scenario:
    Given url "http://localhost:3000/productos"
    And request { "nombre": "tomate", "precio": "1233", "cantidad": "3" }
    When method post
    Then status 201
    And def contactId = $._id