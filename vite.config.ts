import { basename, dirname, resolve } from 'node:path'
import { Buffer } from 'node:buffer'
import { defineConfig } from 'vite'
import fs from 'fs-extra'
import Pages from 'vite-plugin-pages'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import Vue from '@vitejs/plugin-vue'
import matter from 'gray-matter'
import anchor from 'markdown-it-anchor'
import LinkAttributes from 'markdown-it-link-attributes'
import GitHubAlerts from 'markdown-it-github-alerts'
import UnoCSS from 'unocss/vite'
import SVG from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'
import { rendererRich, transformerTwoslash } from '@shikijs/twoslash'
// @ts-expect-error missing types
import TOC from 'markdown-it-table-of-contents'
import sharp from 'sharp'
import { slugify } from './scripts/slugify'
import markdownKatex from 'markdown-it-katex'
import markdownFootnote from 'markdown-it-footnote'
import MarkdownItShiki from '@shikijs/markdown-it'
import MarkdownItMagicLink from 'markdown-it-magic-link'
import {transformerNotationDiff} from '@shikijs/transformers'
const promises: Promise<any>[] = []

export default defineConfig({
  resolve: {
    alias: [
      { find: '~/', replacement: `${resolve(__dirname, 'src')}/` },
    ],
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      'dayjs',
      'dayjs/plugin/localizedFormat',
    ],
  },
  plugins: [
    UnoCSS(),

    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
      script: {
        defineModel: true,
      },
    }),

    Pages({
      extensions: ['vue', 'md'],
      dirs: 'pages',
      extendRoute(route) {
        const path = resolve(__dirname, route.component.slice(1))

        if (!path.includes('experience.md') && !path.includes('expertise.md') && path.endsWith('.md')) {
          const md = fs.readFileSync(path, 'utf-8')
          const { data } = matter(md)
          route.meta = Object.assign(route.meta || {}, { frontmatter: data })
        }
        return route
      },
    }),

    

    Markdown({
      wrapperComponent: id => id.includes('/demo/')
        ? 'WrapperDemo'
        : 'WrapperPost',
      wrapperClasses: (id, code) => code.includes('@layout-full-width')
        ? ''
        : 'prose m-auto slide-enter-content',
      headEnabled: true,
      exportFrontmatter: false,
      exposeFrontmatter: false,
      exposeExcerpt: false,
      markdownItOptions: {
        quotes: '""\'\'',
      },
      async markdownItSetup(md) {
        md.use(await MarkdownItShiki({
          themes: {
            dark: 'one-dark-pro',
            light: 'catppuccin-latte',
          },
          defaultColor: false,
          cssVariablePrefix: '--s-',
          transformers: [
            transformerNotationDiff({}),
            transformerTwoslash({
              explicitTrigger: true,
              renderer: rendererRich(),
            }),
          ],
        }))
        md.use(markdownFootnote);
        md.use(anchor, {
          slugify,
          permalink: anchor.permalink.linkInsideHeader({
            symbol: '#',
            renderAttrs: () => ({ 'aria-hidden': 'true' }),
          }),
        })

        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })

        md.use(TOC, {
          includeLevel: [1, 2, 3, 4],
          slugify,
          containerHeaderHtml: '<div class="table-of-contents-anchor"><div class="i-ri-menu-2-fill" /></div>',
        })
        md.use(markdownKatex);
        
        md.use(MarkdownItMagicLink, {
          linksMap: {
            'Docker': {link: 'https://docker.io/', imageUrl:'https://www.docker.com/wp-content/uploads/2024/01/icon-docker-square.svg'},
            'Podman': {link: 'https://podman.io/', imageUrl:'https://podman.io/logos/optimized/podman-3-logo-95w-90h.webp'},
            'OpenTofu': 'https://github.com/opentofu/opentofu',
            'Gitea': 'https://github.com/go-gitea/gitea',
            'Terraform': {link: 'https://www.terraform.io/', imageUrl:'https://static-00.iconduck.com/assets.00/file-type-terraform-icon-455x512-csyun60o.png'},
            'QuestDB': 'https://github.com/questdb/questdb',
            'Mend Renovate': 'https://github.com/renovatebot/renovate',
            'GitLab': 'https://github.com/gitlabhq/gitlabhq',
            'GitLab Runner': 'https://github.com/gitlabhq/gitlabhq',
            'Git': {link:"https://git-scm.com/", imageUrl:"https://git-scm.com/images/logos/downloads/Git-Icon-1788C.svg"},
            'Github': {link:"https://github.com/", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg"},
            'Traefik': {link:"https://traefik.io/traefik/", imageUrl:"https://djeqr6to3dedg.cloudfront.net/repo-logos/library/traefik/live/logo.png"},
            'Portainer': {link:"https://www.portainer.io/", imageUrl:"https://www.gravatar.com/avatar/681edab450c1ebab7d83e7266b1d0fbb?s=120&r=g&d=404"},
            'Portainer Agent': {link:"https://www.portainer.io/", imageUrl:"https://www.gravatar.com/avatar/681edab450c1ebab7d83e7266b1d0fbb?s=120&r=g&d=404"},            
            'ClickHouse':{link:"https://clickhouse.com/", imageUrl:"https://avatars.githubusercontent.com/u/54801242?s=48&v=4"},
            'Grafana': {link:"https://grafana.com/", imageUrl:"https://avatars.githubusercontent.com/u/7195757?s=48&v=4"},
            'Postgres': { link: "https://www.postgresql.org/", imageUrl:"https://wiki.postgresql.org/images/a/a4/PostgreSQL_logo.3colors.svg"},
            'SonarQube': {link: "https://www.sonarsource.com/products/sonarqube/",imageUrl:"https://seeklogo.com/images/S/sonarqube-logo-AF25541AAF-seeklogo.com.png"},
            'Homer': {link:"https://github.com/bastienwirtz/homer", imageUrl:"https://raw.githubusercontent.com/bastienwirtz/homer/main/public/logo.png"},
            'ElasticSearch': {link:"https://www.elastic.co/",imageUrl:"https://cdn.worldvectorlogo.com/logos/elasticsearch.svg"},
            'ElasticVue': {link:"https://elasticvue.com/",imageUrl:"https://elasticvue.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fwhite_104.ba33adad.webp&w=64&q=75"},
            'Jaeger': {link:"https://jaegertracing.io/",imageUrl:"https://www.jaegertracing.io//img/jaeger-icon-color.png"},
            'Uptime Kuma': {link:"https://github.com/louislam/uptime-kuma", imageUrl:"https://raw.githubusercontent.com/louislam/uptime-kuma/11007823e7207531da4d82cab0b774ee8ace6f57/public/icon.svg"},
            'MongoDB': {link:"https://www.mongodb.com/",imageUrl:"https://www.svgrepo.com/show/331488/mongodb.svg"},
            'GrayLog': {link:"https://graylog.org/", imageUrl:"https://static.cdnlogo.com/logos/g/32/graylog.svg"},
            'Quarkus': {link:"https://quarkus.io/", imageUrl:"https://quarkus.io/assets/images/brand/quarkus_icon_default.svg"},
          },
        })
        
        md.use(GitHubAlerts)
      },
      frontmatterPreprocess(frontmatter, options, id, defaults) {
        (() => {
          if (!id.endsWith('.md'))
            return
          const route = basename(id, '.md')
          if (route === 'index' || frontmatter.image || !frontmatter.title)
            return
          const path = `og/${route}.png`
          promises.push(
            fs.existsSync(`${id.slice(0, -3)}.png`)
              ? fs.copy(`${id.slice(0, -3)}.png`, `public/${path}`)
              : generateOg(frontmatter.title!.replace(/\s-\s.*$/, '').trim(), `public/${path}`),
          )
          frontmatter.image = `https://m.defrancesco.ovh/${path}`
        })()
        const head = defaults(frontmatter, options)
        return { head, frontmatter }
      },
    }),

    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
      ],
    }),

    Components({
      extensions: ['vue', 'md'],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
      ],
    }),

    Icons({
      defaultClass: 'inline',
      defaultStyle: 'vertical-align: sub;',
    }),

    SVG({
      svgo: false,
      defaultImport: 'url',
    }),

    {
      name: 'await',
      async closeBundle() {
        await Promise.all(promises)
      },
    },
  ],

  build: {
    rollupOptions: {
      onwarn(warning, next) {
        if (warning.code !== 'UNUSED_EXTERNAL_IMPORT')
          next(warning)
      },
    },
  },

  ssgOptions: {
    formatting: 'minify',
  },
})

const ogSVg = fs.readFileSync('./scripts/og-template.svg', 'utf-8')

async function generateOg(title: string, output: string) {
  if (fs.existsSync(output))
    return

  await fs.mkdir(dirname(output), { recursive: true })
  // breakline every 25 chars
  const lines = title.trim().split(/(.{0,25})(?:\s|$)/g).filter(Boolean)

  const data: Record<string, string> = {
    line1: lines[0],
    line2: lines[1],
    line3: lines[2],
  }
  const svg = ogSVg.replace(/\{\{([^}]+)}}/g, (_, name) => data[name] || '')

  // eslint-disable-next-line no-console
  console.log(`Generating ${output}`)
  try {
    await sharp(Buffer.from(svg))
      .resize(1200 * 1.1, 630 * 1.1)
      .png()
      .toFile(output)
  }
  catch (e) {
    console.error('Failed to generate og image', e)
  }
}
