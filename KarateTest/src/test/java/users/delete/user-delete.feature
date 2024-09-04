Feature: Delete product

  Scenario: Delete a product
    * call read("../post/user_post_snippets.feature@Create")
    Given url "http://localhost:3000/productos/" + contactId
    When method delete
    Then status 204