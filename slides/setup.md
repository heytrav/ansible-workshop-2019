### Setup


#### Checkout the code
* Clone the course material and sample code
  ```
  git clone https://github.com/heytrav/ansible-workshop-2019.git
  ```
* If you have nodejs installed
  ```
  cd ansible-workshop-2019/slides
  npm install
  npm start
  ```
* ..or follow along in pdf in base directory


#### Installing Ansible
* For this workshop we'll be using Ansible &ge; 2.8
* [Installation options](http://docs.ansible.com/ansible/latest/intro_installation.html)


###### Setup Python virtualenv
* Requirements
  - &ge; python3.5
  - virtualenv
* Set up local Python environment
   ```shell
   virtualenv -p `which python3` ~/venv
   ```
* <!-- .element: class="fragment" data-fragment-index="0" -->Activate virtualenv as base of Python interpreter
   ```shell
   source ~/venv/bin/activate
   ```


###### Install Ansible
* <!-- .element: class="fragment" data-fragment-index="0" -->Update Python package manager (pip)
   ```
   pip install -U pip
   ```
* <!-- .element: class="fragment" data-fragment-index="1" -->Use Python package manager to install Ansible
   ```
   pip install ansible
   ```


###### Install OpenStack dependencies
* Install OpenStack SDK
   ```
   pip install openstacksdk dnspython
   ```
* Install OpenStack client libraries
   ```
   pip install python-{openstackclient,ceilometerclient,heatclient,neutronclient,swiftclient,octaviaclient,magnumclient}
   ```
   <!-- .element: style="font-size:8pt;"  -->
