Feature: Get product

  Scenario: Get a product
    Given url "http://localhost:3000" +"/productos/" + "66d88738bf26ac1e37ecd659"
    When method get
    Then status 200

  Scenario: Get product
    Given url "http://localhost:3000/productos/"
    When method get
    Then status 200

#  Scenario: Get a list of products
#    * def jsonResponse = read('../json/list_of_users.json')
#    Given url "http://localhost:3000/productos/"
#    When method get
#    Then status 200
#    And match $ == jsonResponse
#    And match $ == read('../json/list_of_users.json')