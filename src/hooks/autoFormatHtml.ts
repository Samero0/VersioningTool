import beautify from 'js-beautify';

//auto-format HTML with js-beautify
export const formatHtml = (html: string) => {
  return beautify.html(html, { indent_size: 2, wrap_attributes: "auto" });
};
