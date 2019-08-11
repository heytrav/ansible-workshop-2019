### Provisioning Hosts


#### Creating Our Cluster
* For this tutorial we are going to need seven machines
  - 2 for nginx web server
  - 2 for our web application
  - 1 db
  - 1 Load balancer
  - 1 Bastion
* Seems like a lot, but we are trying to simulate upgrades across a cluster


#### Running playbook
* Start the provisioning playbook
  ```
  ansible-playbook -i ansible/inventory/cloud-hosts ansible/provision-hosts.yml -K
  ```
  <!-- .element: style="font-size:11pt;"  -->


#### Our cluster 
* HTTP traffic reaches web hosts via load balancer
![cotd-cluster](img/cotd-bastion-arch.png "COTD cluster") <!-- .element: class="img-right"  width="30%"  -->
* Application receives traffic from web hosts on port 5000
* DB receives traffic from app hosts on 5432
* SSH traffic
  - only bastion reachable from outside
  - all other hosts only from bastion


#### Host Inventory
* The inventory for our cluster is defined in 
  ```shell
  ansible/inventory/cloud-hosts
  ```
* Groups used to define architecture of cluster
  ```ini
  [loadbalancer]
  pycon-lb

  [web]
  pycon-web[1:2]# range of hosts i.e. pycon-web1, pycon-web2

  [app]
  pycon-app[1:2] 
  ```
  <!-- .element: style="font-size:9pt;"  -->
* Hosts may belong to multiple groups
  ```ini
  [web]
  pycon-web[1:2]

  [blue]
  pycon-web1
  ```
  <!-- .element: style="font-size:9pt;"  -->


#### High Level View <!-- .slide: class="image-slide" -->
![cotd-venn](img/cotd-venn.png "COTD venn diagram")


#### Cloud Modules
* Cloud deployments typically involve creating resources with a provider
  - Instances
  - Networks
  - Security groups, acls, etc
* Ansible has [modules](https://docs.ansible.com/ansible/latest/modules/list_of_cloud_modules.html) that cover most providers/resources
* We will use [OpenStack Modules](https://docs.ansible.com/ansible/latest/modules/list_of_cloud_modules.html#openstack)


#### The `provision-hosts.yml` playbook
* <!-- .element: class="fragment" data-fragment-index="0" -->Tasks in the
  first play are executed on local machine
   <pre style="font-size:10pt;"><code data-trim data-noescape>
   name:  Provision a set of hosts in Catalyst Cloud
   hosts: <mark>localhost</mark>
   gather_facts: false
   tasks:
</code></pre>
* <!-- .element: class="fragment" data-fragment-index="1" -->Boilerplate for creating multiple cloud hosts
  - log in to cloud provider
  - create router, network, security groups
  - create each host
* <!-- .element: class="fragment" data-fragment-index="2" -->Ansible uses openstack API in the background

Note:
- all tasks with os_ in module are cloud api
- building cloud modules generally boilerplate


#### Bastion host

* Only one machine is directly accessible by SSH <!-- .element: class="fragment" data-fragment-index="0" -->
* This host is a<!-- .element: class="fragment" data-fragment-index="1" --> _bastion_ or _jump host_ 
* All other hosts can only be reached from<!-- .element: class="fragment" data-fragment-index="2" -->
 _bastion_ Note: Adds some extra security for our cluster 


#### Using Ansible via a bastion host
* Hosts in *private_net* group do not have public IP ![cotd-venn-private](img/cotd-venn-private_net.png "Private net") <!-- .element: class="img-right" width="40%" -->
* Only way to SSH in is by traversing the *bastion* host
* <!-- .element: class="fragment" data-fragment-index="0" -->Can tell ansible
  to do this for group
  ```yaml
  ansible_ssh_common_args: >  
      -o StrictHostKeyChecking=no  
      -o ProxyCommand='ssh ubuntu@bastion exec nc -w300 %h %p'"
  ```


#### Additional setup for hosts
* Set NZ locale, timezone, etc.
* Edit `/etc/hosts` on each host
  * bastion host to resolve all hosts in cluster
  * loadbalancer host to resolve all hosts in *web* group
  * _web_ to resolve _app_ host
  * _app_ host to resolve _db_
* Update local machine `/etc/hosts` to resolve our loadbalancer public IP


#### Delegation
* Often need to configure one host *in the context of another host*
   - Add web host IPs to another hosts `/etc/hosts`/
* Key to this is *delegation*

<pre class="fragment" data-fragment-index="2" style="font-size:13pt;"><code data-trim data-noescape>
- name: Set up web hosts with mapping to backend
  hosts: <mark>web</mark>
  .
    - name: Map each of the frontend hosts in the loadbalancer
      lineinfile:
        dest: /etc/hosts
        line: "{{ ansible_host }} frontend{{ group_index }}"
      <mark>delegate_to: "{{ groups.loadbalancer.0 }}"</mark>
</code></pre>
