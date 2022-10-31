# adoc-skin

A modern and fully-customizable skin on top of the default Asciidoctor stylesheet.


## Installation

```console
pnpm add -D adoc-skin
```


## Usage

```scss
// Set your preferences
@use "adoc-skin/src/config" with (
  $color-brand: red,
  // ... and more
);
// Use the library
@use "adoc-skin";
```