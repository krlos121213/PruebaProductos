Feature: Put product


  Scenario: Put a product
    * call read("../post/user_post_snippets.feature@Create")
    Given url "http://localhost:3000/productos/" + contactId
    And  request { "nombre": "tomate actualizado", "precio": "1233", "cantidad": "3" }
    When method put
    Then status 200
    And match $.nombre == 'tomate actualizado'