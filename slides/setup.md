#### Installing Ansible

* Target Ansible version &ge; 2.7
* [Official Documentation](http://docs.ansible.com/ansible/latest/intro_installation.html)
* Explore a couple approaches using:
  * OS package manager
  * Python package manager (pip)


##### Base Requirements
###### Python

* Ansible &lt; 2.5 require Python 2.7
   * support for Python 3 considered *tech preview*
* Ansible &ge; 2.5 supports Python 2.7 and Python &ge; 3.5


###### Installing OS package

 <asciinema-player autoplay="0"  loop="loop" font-size="medium" speed="1" theme="solarized-light" src="lib/apt-cache-policy-ansible.json" cols="200" rows="10"></asciinema-player>
* Ansible available with OS typically a bit out of date
* Generally necessary to add source repo [(apt, yum, etc.)](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)


###### Installing as Python virtualenv
* Other method is to set up a Python *virtual environment*
* Advantage of this technique: multiple separate ansible environments
  * Different needs for different projects
* Generally possible with both Python2 and Python3
  * We'll assume Python3


###### Ansible in a Python Virtual Environment
* Install python requirements
   ```
   sudo apt-get install python3-pip virtualenv
   ```
  <!-- .element: style="font-size:11pt;"  -->
* Set up local Python environment
   ```
   virtualenv -p /usr/bin/python3 ~/venv
   ```


###### Install Ansible
* <!-- .element: class="fragment" data-fragment-index="0" -->Activate virtualenv as base of Python interpreter
   ```
   source ~/venv/bin/activate
   ```
* <!-- .element: class="fragment" data-fragment-index="1" -->Update Python package manager (pip)
   ```
   pip install -U pip
   ```
* <!-- .element: class="fragment" data-fragment-index="2" -->Use Python package manager to install Ansible
   ```
   pip install ansible
   ```


###### Install openstack dependencies
* Install some tools that we'll need for the cloud
   ```
   pip install openstacksdk dnspython
   ```
   ```
   pip install python-{openstackclient,ceilometerclient,heatclient,neutronclient,swiftclient,octaviaclient,magnumclient}
   ```
