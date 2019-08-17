### Setup


#### Checkout the code
* Clone the course material and sample code
  ```shell
  git clone https://github.com/heytrav/ansible-workshop-2019.git
  ```
  <!-- .element: style="font-size:11pt;"  -->
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


#### Decrypting vault secrets
* Some variables are stored using `ansible-vault`
* We can avoid having ansible complain about not finding a vault password
* The `ansible.cfg` file is set up to look for a file called `.default_id`
  ```ini
  vault_identity_list = default@.default_id
  ```
* Create an identity file to store the password
  ```
  echo "train" > .default_id
  ```

[Back to outline](course-outline.md)
