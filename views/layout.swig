<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>{% block title %}Index{% endblock %} - Quad Admin</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  {% css cssGzip mongoExpress %}
  <style type="text/css">
    body {
      padding-top: 60px;
      padding-bottom: 40px;
    }
    .sidebar-nav {
      padding: 9px 0;
    }
  </style>
  <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
  {% js jsGzip mongoExpress %}
  {% block head %}{% endblock %}
</head>

<body>

<div class="navbar navbar-fixed-top">
  <div class="navbar-inner">
    <div class="container">
      <a class="brand" href="">Quad Admin</a>
      <div class="nav-collapse">
        <ul class="nav">
          <li><a href="">Home</a></li>
          {#<li><a href="cmd">Command Line</a></li>#}
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="container">
  <div class="row">
    <div class="span3">
      <div class="well sidebar-nav">
        <ul class="nav nav-list">
          {% for db in databases %}
          <li class="nav-header" onclick="$('#toggle_{{ db }}').collapse('toggle')">
            {{ db }}
            <i class="icon-chevron-down pull-right"></i>
          </li>
          <li><a href="{{ baseHref }}db/{{ db }}"><i class="icon-folder-open"></i> View Database</a></li>
            <ul class="unstyled collapse nav nav-list
            {%- if db == dbName %} in{% endif -%}
            " id="toggle_{{ db }}">
            {% for collection_db in collections -%}
              {% if loop.key == db -%}
                {% for collection in collection_db -%}
                  <li><a href="{{ baseHref }}db/{{ db }}/{{ collection }}"><i class="icon-list-alt"></i> {{ collection }}</a></li>
                {%- endfor %}
              {%- endif %}
            {%- endfor %}
            </ul>
          <li class="divider"></li>
          {% endfor %}
        </ul>
      </div>

      {% block sidebar %}{% endblock %}
    </div>

    <div class="span9">
      <ul class="breadcrumb">
      {% block breadcrumb %}
        <li class="active">
          Home
        </li>
      {% endblock %}
      </ul>

      <div class="page-header">
      <h1 id="pageTitle">{{ title }}</h1>
      </div>

      {% if messageSuccess %}
      <div class="alert alert-success">
        <button class="close" data-dismiss="alert">×</button>
        <strong>{{ messageSuccess }}</strong>
      </div>
      {% endif %}

      {% if messageError %}
      <div class="alert alert-error">
        <button class="close" data-dismiss="alert">×</button>
        <strong>{{ messageError }}</strong>
      </div>
      {% endif %}

      {% block content %}{% endblock %}
    </div>
  </div>
</div>

</body>
</html>
