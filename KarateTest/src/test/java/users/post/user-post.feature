Feature: Post product
  
  Background: 
    * url "http://localhost:3000/productos"
    #* * def var = {"name": "car;ps","job": "leader"}
    * request  {"nombre": "#(nombre)","precio": "#(precio)","cantidad": "#(cantidad)"}

  Scenario: Post a product
    And request { "nombre": "tomate", "precio": "1233", "cantidad": "3" }
    When method post
    Then status 201


  Scenario Outline: Post a user
    When method post
    Then status 201

    Examples:
      | nombre  | precio | cantidad |
      | tomate  | 22     | 2        |
      | cebolla | 22     | 2        |
      | ajo     | 22     | 2        |

