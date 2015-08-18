#!/usr/bin/env ruby
# Encoding: utf-8
# Inspired by http://www.skorks.com/2011/02/a-unit-testing-framework-in-44-lines-of-ruby/
require 'open3'

# Main include file: entry point of your module
# Typically, the file you'd import in your application
# e.g. @import 'your_module/my_file.scss';
$main_include_file ||= "main.scss"

# Where you'll write the Sass that will output the CSS
# to be parsed by your test suite
$test_file ||= "test/test.scss"

# If tests fail, check the compiled CSS in this file
# Ignore this file in versioning (e.g. add to .gitignore)
$test_error_file ||= "test/error.css"

$cssoutput = Open3.capture3("node-sass #{$test_file} --include-path bower_components --stdout")[0]

module Kernel
  def describe(description, &block)
    tests = Dsl.new.parse(description, block)
    tests.execute
  end
end
class Object
  def should
    self
  end
end
class Dsl
  def initialize
    @tests = {}
  end
  def parse(description, block)
    self.instance_eval(&block)
    Executor.new(description, @tests)
  end
  def it(description, &block)
    @tests[description] = block
  end
end
class Executor
  def initialize(description, tests)
    @description = description
    @tests = tests
    @success_count = 0
    @failure_count = 0
  end
  def execute
    puts "\n#{@description}"
    @tests.each_pair do |name, block|
      result = self.instance_eval(&block)
      puts result ? "\e[32m✓ #{name} \e[0m" : "\e[31m✖ #{name} \e[0m"
      result ? @success_count += 1 : @failure_count += 1
    end
    summary
  end
  def summary
    puts "\n#{@tests.keys.size} tests, #{@success_count} success, #{@failure_count} failure"

    if @failure_count > 0
      stdout, stderr, status = Open3.capture3 "node-sass #{$test_file} #{$test_error_file} --include-path bower_components"
    end
  end
end

class String
  # squish method borrowed from Rails that removes newlines and extra spaces
  def squish
    strip.gsub /\s+/, ' '
  end
  # Load the module and compile to CSS
  def sass_to_css
    Open3.pipeline_r(['echo', ["@import '#{$main_include_file}';", self].join], ['node-sass --include-path bower_components']) do |output|
      output.read
    end
  end
end

# Test if a string appears in a multi-line output
def find(needle, haystack = $cssoutput)
  haystack.squish.include? needle.squish
end
