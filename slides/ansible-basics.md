### Ansible Basics
##### (Just for review)


#### Terminology
<div style="width:50%;float:left;">
    <dl>
        <dt>Task      </dt> <dd>   An action to perform</dd>
        <dt>Play      </dt> <dd>   a collection of tasks</dd>
        <dt>Playbook</dt>   <dd> YAML file containing one or more plays</dd>
    </dl>
</div>
![Workflow](img/ansible-workflow.png "Ansible Workflow") <!-- .element: class="" style="width:50%;float:left" -->


#### Ansible Playbook Structure
![playbook-anatomy](img/playbook-anatomy.png "Playbook anatomy") <!-- .element: style="float:left" width="50%"-->

* A playbook is a YAML file containing a list of plays
* A play is a dictionary object


#### Ansible Playbook Structure
* A play must contain:
  * `hosts`
    * A string representing a particular host or _group_ of hosts
      * `hosts: localhost`
      * `hosts: app.mywebsite.com`
      * `hosts: appserver`
    * These are what you will configure


#### Ansible Playbook Structure

* A play may optionally contain:
   * tasks
     * A list of dictionaries
     * What you want to do
   * name
     * Description of the play
   * vars
     * Variables scoped to the play


#### Structure of a Task

* A task is a dictionary object containing
  * name 
    * Describes what the task does
    * Optional but best practice to use
  * module
    * Dictionary object
    * Key represents Python module which will perform tasks
    * May have arguments


#### Structure of a Task
<div style="width:50%;float:left;">
    <img src="img/playbook-task-anatomy.svg"/>
</div>
<div style="width:50%;float:left;">
    <ul>
        <li>
            Two styles of module object in tasks
            <ul>
                <li>string form</li>
                <li>dictionary form</li>
            </ul>
        </li>
        <li>
            Dictionary form is more suitable for complex arguments
        </li>
        <li>
            Matter of preference/style
        </li>
    </ul>
</div>


#### More Terminology
<dl>
                        <dt>Module    </dt> <dd>Blob of Python code which is executed to perform task</dd>
                        <dt>Inventory </dt> <dd>File containing hosts and groups of hosts to run tasks</dd>
                    </dl>


#### Indentation & YAML
* <!-- .element: class="fragment" data-fragment-index="0" -->YAML is a stickler for indentation
* <!-- .element: class="fragment" data-fragment-index="1" -->TABS not allowed (Ansible will complain)
* <!-- .element: class="fragment" data-fragment-index="2" -->Playbook indentation
  <pre style="font-size:10pt;"><code data-trim data-noescape>
  - name: This is a play
  <mark>  </mark>hosts: somehosts             # 2 spaces
  <mark>  </mark>tasks:
  <mark style="background-color:lightblue">    </mark>- name: This is a task     # 4 spaces
  <mark style="background-color:lightgreen">      </mark>module:                  # 6 spaces
  <mark style="background-color:pink">        </mark>attr: someattr         # 8 spaces
  <mark style="background-color:pink">        </mark>attr1: someattr
  <mark style="background-color:pink">        </mark>attr2: someattr
</code></pre>
* <!-- .element: class="fragment" data-fragment-index="3" -->Use an editor that supports YAML syntax
  - Atom
  - Vim
  - Emacs


#### Vim YAML setup
* `.vimrc` file
  ```
  syntax on
  filetype plugin indent on
  ```
* `~/.vim/after/ftplugin/yaml.vim`
  ```
  set tabstop=2 "Indentation levels every two columns
  set expandtab "Convert all tabs that are typed to spaces
  set shiftwidth=2 "Indent/outdent by two columns
  set shiftround "Indent/outdent to nearest tabstop
  ```
  <!-- .element: style="font-size:11pt;"  -->



* [Back to outline](course-outline.md)
