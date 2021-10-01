---
author: admin
date: 2008-07-22 17:36:03+00:00
draft: false
title: Vendor Gems in Rake-Tasks verwenden
type: post
url: /2008/07/22/vendor-gems-in-rake-tasks-verwenden/
categories:
- Rails
tags:
- gems
- Rails
- rakefile
- ruby
- vendor
---

Für das Deployment einer Rails-Anwendung ist es eine gute Sache, die für die Anwendung benötigten Gems in das Verzeichnis `/vendor/gems` zu kopieren. Der Hintergrund ist einfach - so wird sichergestellt, dass der Server dieselbe Version des Gems referenziert wie vom Entwickler vorgesehen.

Damit Rails diese zur Laufzeit findet wird in der `environment.rb` folgender Code eingefügt: 


    
    
    config.load_paths += Dir["#{RAILS_ROOT}/vendor/gems/**"].map do |dir| 
      File.directory?(lib = "#{dir}/lib") ? lib : dir
    end
    



Das Problem dabei ist nun, dass die Vendor-Gems nicht von den Rake-Tasks gefunden werden. Dies liegt daran, dass die `environment.rb` nicht im Rakefile eingebunden ist. Um dies zu ändern, muss einfach folgende Zeile in das `Rakefile` eingefügt werden:


    
    
    # we need this to require the vendor/gems
    require(File.join(File.dirname(__FILE__), 'config', 'environment'))
    



Danach kann man Vendor-Gems auch in Rake-Tasks verwenden.

