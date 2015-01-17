# browserify-dedupe-patch
Patches a bug in pre 8.0 browserify where watchify breaks bundle when modules are mistakenly deduped with full paths.

See browserify [issue #940](https://github.com/substack/node-browserify/issues/940)

In the thread, [saschagehlich](https://github.com/saschagehlich) appears to be
experiencing the same issue as the YuzuJS team, where when watchify is used
modules are mistakenly deduped due to fullPaths.

This patch implements the suggestion of [saschagehlich](https://github.com/saschagehlich) to simply not dedupe the files by not adding to the bundle.

[substack](https://github.com/substack) claims that this is fixed in the 8.0 branch, however YuzuJS currently using 6.x. So when we are ready to upgrade we will check to see if this bug is indeed fixed in browser >= 8.

Howefully this repo will not have a long life :)

## browserify dependency
This patch was only verified with browserify 6.1.

This patch may work for 7.x as well, so instead of listing a peerDependency on 6.x, feel free to use at your own risk!
