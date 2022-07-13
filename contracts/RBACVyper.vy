# @version 0.3.4

enum Roles:
    ADMIN
    MINTER
    USER
    GUEST

roles: public(HashMap[address, Roles])

@external
def addAdmin():
    self.roles[msg.sender] |= Roles.ADMIN

@external
def addMinter():
    self.roles[msg.sender] |= Roles.MINTER

@external
def addUser():
    self.roles[msg.sender] |= Roles.USER

@external
def addGuest():
    self.roles[msg.sender] |= Roles.GUEST

