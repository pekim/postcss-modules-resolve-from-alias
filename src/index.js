import postcss from 'postcss';
import path from 'path';

const declFilter = /^composes$/;
const matchImports = /^(.+?\s+from\s+)(?:'([^']+)'|"([^"]+)"|(global))$/;

function ensureTrailingSeparator(pathname) {
  return pathname.endsWith(path.sep)
    ? pathname
    : pathname + path.sep
  ;
}

function processOptions(options) {
  const aliases = {};

  for (const key of Object.keys(options)) {
    const value = options[key];

    aliases[ensureTrailingSeparator(key)] = ensureTrailingSeparator(value);
  }

  return aliases;
}

function replaceAlias(path, aliases) {
  const alias = Object.keys(aliases).find(alias => path.startsWith(alias));

  return alias
    ? path.replace(new RegExp('^' + alias), aliases[alias])
    : path
  ;
}

function processDecl(decl, aliases) {
  const matches = decl.value.match( matchImports );

  if (matches) {
    const [/*match*/, beforePath, singleQuotePath, doubleQuotePath] = matches;
    const pathQuote = doubleQuotePath ? '"' : '\'';
    const path = singleQuotePath || doubleQuotePath;
    const newPath = replaceAlias(path, aliases);

    decl.value = `${beforePath}${pathQuote}${newPath}${pathQuote}`;
  }
}

export default postcss.plugin( 'modules-extract-imports', (options = {}) => {
  const aliases = processOptions(options);

  return css => {
    // find any declaration that looks like a 'composes'
    css.walkDecls(declFilter, decl => processDecl(decl, aliases));
  };
});
