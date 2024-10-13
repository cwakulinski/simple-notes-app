import * as nodePathModule from 'node:path';

import ts from 'typescript';
import { ResolveOptions } from 'webpack';
import type { CompilerOptions } from 'typescript';

class WebpackConfigUtil {
    public static getResoleAliases(): ResolveOptions['alias'] {
        const output: ResolveOptions['alias'] = {};
        const tsConfigPaths = WebpackConfigUtil.getTsConfigPaths() ?? {};

        for ( const [ alias, paths ] of Object.entries( tsConfigPaths ) ) {
            const parsedAlias = WebpackConfigUtil.tsConfigAliasToWebpackResolveAlias( alias )
            const parsedPaths = WebpackConfigUtil.parseTsConfigPathAliasesIntoWebpackResolvePaths( paths )

            output[ parsedAlias ] = parsedPaths;
        }


        return output;
    }

    private static getTsConfigPaths(): CompilerOptions['paths'] {
        const tsConfigData = WebpackConfigUtil.getParsedTsConfig()

        return tsConfigData.options.paths

    }

    private static getParsedTsConfig(): ts.ParsedCommandLine {
        const tsConfigPath = nodePathModule.resolve( WebpackConfigUtil.getRootPath(), './tsconfig.json' )
        const tsConfig = ts.readConfigFile( tsConfigPath, ts.sys.readFile )

        if (tsConfig.error) {
            throw new Error('Ts config read error')
        }

        return  ts.parseJsonConfigFileContent(
            tsConfig.config,
            ts.sys,
            nodePathModule.dirname(tsConfigPath)
        );
    }


    private static parseTsConfigPathAliasesIntoWebpackResolvePaths( pathsToParse: string[] ): string[] {
        const output: string[] = []

        /* Looks cleaner than pathsToParse.map */
        for ( const pathToParse of pathsToParse ) {
            output.push(
                WebpackConfigUtil.tsConfigPathEntryToWebpackResolvePath( pathToParse )
            )
        }

        return output
    }

    private static tsConfigPathEntryToWebpackResolvePath( tsConfigPath: string ): string {
        const rootPath: string = WebpackConfigUtil.getRootPath()
        const tsConfigPathWithNoStar = tsConfigPath.replace( /\/\*$/, '' );

        return nodePathModule.resolve( rootPath, tsConfigPathWithNoStar )
        // return tsConfigPathWithNoStar
    }

    private static getRootPath(): string {
        return nodePathModule.dirname( __dirname );
    }

    private static tsConfigAliasToWebpackResolveAlias( alias: string ) {
        return alias.replace( /\/\*$/, '' )
    }
}

export default WebpackConfigUtil
