/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query Page($locale: SiteLocale, $fallbackLocale: [SiteLocale!], $slug: String) {\n  page(\n    filter: {slug: {eq: $slug}}\n    locale: $locale\n    fallbackLocales: $fallbackLocale\n  ) {\n    seo: _seoMetaTags {\n      attributes\n      content\n      tag\n    }\n    sections {\n      ... on RecordInterface {\n        id\n        __typename\n      }\n      ... on LogoCarouselSectionRecord {\n        ...LogoCarouselSection\n      }\n      ... on RedirectSectionRecord {\n        slugToRedirectTo\n      }\n      ... on LecturersSectionRecord {\n        ...LecturersSection\n      }\n      ... on PageImageTitleSectionRecord {\n        ...PageImageTitleSection\n      }\n      ... on TextSectionRecord {\n        ...TextSection\n      }\n      ... on BorderDividerRecord {\n        ...BorderDivider\n      }\n      ... on ImageHeroSectionRecord {\n        ...ImageHeroSection\n      }\n      ... on SplitImageTextSectionRecord {\n        ...SplitImageTextSection\n      }\n      ... on AccordionSectionRecord {\n        ...AccordionSection\n      }\n      ... on CourseTableSectionRecord {\n        ...CourseTableSection\n      }\n      ... on FeaturedContentSectionRecord {\n        ...FeaturedContentSection\n      }\n      ... on StaffSectionRecord {\n        ...StaffSection\n      }\n    }\n    id\n    label\n    __typename\n  }\n}": types.PageDocument,
    "query PageStaticParams {\n  allPages {\n    slug\n  }\n}": types.PageStaticParamsDocument,
    "query CommonLayout($locale: SiteLocale, $fallbackLocale: [SiteLocale!]) {\n  layout(locale: $locale, fallbackLocales: $fallbackLocale) {\n    logo {\n      url\n      responsiveImage {\n        ...DatoImage_responsiveImage\n      }\n    }\n    menu {\n      ... on MenuItemRecord {\n        id\n        title\n        __typename\n        page {\n          slug\n        }\n      }\n      ... on MenuDropdownRecord {\n        id\n        title\n        __typename\n        items {\n          ... on MenuItemRecord {\n            id\n            title\n            __typename\n            page {\n              slug\n            }\n          }\n        }\n      }\n    }\n    footerSubtitle\n    footerCopyright\n    footerLogoLeft {\n      url\n      height\n      width\n    }\n    footerLogoRight {\n      url\n      height\n      width\n    }\n    socialMediaLinks {\n      url\n      name\n      id\n      iconName\n    }\n    footerLinks {\n      ... on LegalPageRecord {\n        id\n        slug\n        title\n        id\n      }\n    }\n  }\n  _site {\n    locales\n  }\n}": types.CommonLayoutDocument,
    "query Layout {\n  _site {\n    faviconMetaTags {\n      attributes\n      content\n      tag\n    }\n  }\n}": types.LayoutDocument,
    "query Locales {\n  _site {\n    locales\n  }\n}": types.LocalesDocument,
    "fragment DatoImage_responsiveImage on ResponsiveImage {\n  src\n  srcSet\n  base64\n  width\n  height\n  alt\n  title\n}": types.DatoImage_ResponsiveImageFragmentDoc,
    "fragment FeaturedDocumentationPages on DocumentationHomeRecord {\n  featuredPages {\n    id\n    ...FeaturedDocumentationPagesPreviewCard\n  }\n}\n\nfragment FeaturedDocumentationPagesPreviewCard on DocumentationPageRecord {\n  title\n  subtitle\n  slug\n}": types.FeaturedDocumentationPagesFragmentDoc,
    "fragment PostExcerpt on PostRecord {\n  _publishedAt\n  slug\n  id\n  title\n  tags {\n    tag\n  }\n  seoTags {\n    description\n    image {\n      responsiveImage {\n        ...DatoImage_responsiveImage\n      }\n    }\n  }\n  author {\n    name\n    bio\n    slug\n    picture {\n      responsiveImage(imgixParams: {w: \"64\", h: \"64\", fit: crop}) {\n        ...DatoImage_responsiveImage\n      }\n    }\n  }\n}": types.PostExcerptFragmentDoc,
    "fragment AccordionSection on AccordionSectionRecord {\n  title\n  items {\n    id\n    title\n    subtitle\n    text\n  }\n  bgColor {\n    hex\n  }\n  textColor {\n    hex\n  }\n}": types.AccordionSectionFragmentDoc,
    "fragment BorderDivider on BorderDividerRecord {\n  borderImage {\n    url\n  }\n}": types.BorderDividerFragmentDoc,
    "fragment CourseTableSection on CourseTableSectionRecord {\n  title\n  courses {\n    text\n  }\n  brochure {\n    url\n  }\n  buttonText\n}": types.CourseTableSectionFragmentDoc,
    "fragment FeaturedContentSection on FeaturedContentSectionRecord {\n  title\n  features {\n    id\n    title\n    text\n    link {\n      slug\n    }\n  }\n  textColor {\n    hex\n  }\n  bgColor {\n    hex\n  }\n  image {\n    responsiveImage(imgixParams: {auto: format, w: 1152}) {\n      alt\n      src\n      width\n      height\n      sizes\n    }\n  }\n}": types.FeaturedContentSectionFragmentDoc,
    "fragment ImageHeroSection on ImageHeroSectionRecord {\n  bgImage {\n    responsiveImage(imgixParams: {auto: format, w: 1920}) {\n      alt\n      src\n      width\n      height\n      sizes\n    }\n  }\n  bgColor {\n    hex\n  }\n  useImageHeight\n}": types.ImageHeroSectionFragmentDoc,
    "fragment LecturersSection on LecturersSectionRecord {\n  lecturersTitle: title\n  lecturers {\n    id\n    name\n    jobTitle\n    email\n    cvLink\n    category\n    biography\n    image {\n      responsiveImage(imgixParams: {auto: format, w: 400}) {\n        ...DatoImage_responsiveImage\n      }\n    }\n  }\n}": types.LecturersSectionFragmentDoc,
    "fragment LogoCarouselSection on LogoCarouselSectionRecord {\n  logoCarouselTitle: title\n  cards {\n    id\n    name\n    image {\n      url\n      alt\n      height\n      width\n    }\n  }\n}": types.LogoCarouselSectionFragmentDoc,
    "fragment PageImageTitleSection on PageImageTitleSectionRecord {\n  pageTitle: title\n  pageImage: image {\n    url\n    alt\n    height\n    width\n  }\n  bgColor {\n    hex\n  }\n  pageBgImage: bgImage {\n    responsiveImage(imgixParams: {auto: format, w: 1920}) {\n      alt\n      src\n      width\n      height\n      sizes\n    }\n  }\n}": types.PageImageTitleSectionFragmentDoc,
    "fragment SplitImageTextSection on SplitImageTextSectionRecord {\n  splitImageTitle: title\n  splitImageText: text\n  imageAlignment\n  bgColor {\n    hex\n  }\n  textColor {\n    hex\n  }\n  image {\n    responsiveImage(imgixParams: {auto: format, w: 793}) {\n      alt\n      src\n      width\n      height\n      sizes\n    }\n  }\n}": types.SplitImageTextSectionFragmentDoc,
    "fragment StaffSection on StaffSectionRecord {\n  staffTitle: title\n  bgColor {\n    hex\n  }\n  textColor {\n    hex\n  }\n  staff {\n    id\n    name\n    jobTitle\n    email\n    cvLink {\n      url\n    }\n    biography\n    image {\n      responsiveImage(imgixParams: {auto: format, w: 400}) {\n        alt\n        src\n        width\n        height\n        sizes\n      }\n    }\n  }\n}": types.StaffSectionFragmentDoc,
    "fragment TextSection on TextSectionRecord {\n  textSectionTitle: title\n  textSectionText: text\n  textBlockSize\n  bgColor {\n    hex\n  }\n  textColor {\n    hex\n  }\n}": types.TextSectionFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Page($locale: SiteLocale, $fallbackLocale: [SiteLocale!], $slug: String) {\n  page(\n    filter: {slug: {eq: $slug}}\n    locale: $locale\n    fallbackLocales: $fallbackLocale\n  ) {\n    seo: _seoMetaTags {\n      attributes\n      content\n      tag\n    }\n    sections {\n      ... on RecordInterface {\n        id\n        __typename\n      }\n      ... on LogoCarouselSectionRecord {\n        ...LogoCarouselSection\n      }\n      ... on RedirectSectionRecord {\n        slugToRedirectTo\n      }\n      ... on LecturersSectionRecord {\n        ...LecturersSection\n      }\n      ... on PageImageTitleSectionRecord {\n        ...PageImageTitleSection\n      }\n      ... on TextSectionRecord {\n        ...TextSection\n      }\n      ... on BorderDividerRecord {\n        ...BorderDivider\n      }\n      ... on ImageHeroSectionRecord {\n        ...ImageHeroSection\n      }\n      ... on SplitImageTextSectionRecord {\n        ...SplitImageTextSection\n      }\n      ... on AccordionSectionRecord {\n        ...AccordionSection\n      }\n      ... on CourseTableSectionRecord {\n        ...CourseTableSection\n      }\n      ... on FeaturedContentSectionRecord {\n        ...FeaturedContentSection\n      }\n      ... on StaffSectionRecord {\n        ...StaffSection\n      }\n    }\n    id\n    label\n    __typename\n  }\n}"): (typeof documents)["query Page($locale: SiteLocale, $fallbackLocale: [SiteLocale!], $slug: String) {\n  page(\n    filter: {slug: {eq: $slug}}\n    locale: $locale\n    fallbackLocales: $fallbackLocale\n  ) {\n    seo: _seoMetaTags {\n      attributes\n      content\n      tag\n    }\n    sections {\n      ... on RecordInterface {\n        id\n        __typename\n      }\n      ... on LogoCarouselSectionRecord {\n        ...LogoCarouselSection\n      }\n      ... on RedirectSectionRecord {\n        slugToRedirectTo\n      }\n      ... on LecturersSectionRecord {\n        ...LecturersSection\n      }\n      ... on PageImageTitleSectionRecord {\n        ...PageImageTitleSection\n      }\n      ... on TextSectionRecord {\n        ...TextSection\n      }\n      ... on BorderDividerRecord {\n        ...BorderDivider\n      }\n      ... on ImageHeroSectionRecord {\n        ...ImageHeroSection\n      }\n      ... on SplitImageTextSectionRecord {\n        ...SplitImageTextSection\n      }\n      ... on AccordionSectionRecord {\n        ...AccordionSection\n      }\n      ... on CourseTableSectionRecord {\n        ...CourseTableSection\n      }\n      ... on FeaturedContentSectionRecord {\n        ...FeaturedContentSection\n      }\n      ... on StaffSectionRecord {\n        ...StaffSection\n      }\n    }\n    id\n    label\n    __typename\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query PageStaticParams {\n  allPages {\n    slug\n  }\n}"): (typeof documents)["query PageStaticParams {\n  allPages {\n    slug\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CommonLayout($locale: SiteLocale, $fallbackLocale: [SiteLocale!]) {\n  layout(locale: $locale, fallbackLocales: $fallbackLocale) {\n    logo {\n      url\n      responsiveImage {\n        ...DatoImage_responsiveImage\n      }\n    }\n    menu {\n      ... on MenuItemRecord {\n        id\n        title\n        __typename\n        page {\n          slug\n        }\n      }\n      ... on MenuDropdownRecord {\n        id\n        title\n        __typename\n        items {\n          ... on MenuItemRecord {\n            id\n            title\n            __typename\n            page {\n              slug\n            }\n          }\n        }\n      }\n    }\n    footerSubtitle\n    footerCopyright\n    footerLogoLeft {\n      url\n      height\n      width\n    }\n    footerLogoRight {\n      url\n      height\n      width\n    }\n    socialMediaLinks {\n      url\n      name\n      id\n      iconName\n    }\n    footerLinks {\n      ... on LegalPageRecord {\n        id\n        slug\n        title\n        id\n      }\n    }\n  }\n  _site {\n    locales\n  }\n}"): (typeof documents)["query CommonLayout($locale: SiteLocale, $fallbackLocale: [SiteLocale!]) {\n  layout(locale: $locale, fallbackLocales: $fallbackLocale) {\n    logo {\n      url\n      responsiveImage {\n        ...DatoImage_responsiveImage\n      }\n    }\n    menu {\n      ... on MenuItemRecord {\n        id\n        title\n        __typename\n        page {\n          slug\n        }\n      }\n      ... on MenuDropdownRecord {\n        id\n        title\n        __typename\n        items {\n          ... on MenuItemRecord {\n            id\n            title\n            __typename\n            page {\n              slug\n            }\n          }\n        }\n      }\n    }\n    footerSubtitle\n    footerCopyright\n    footerLogoLeft {\n      url\n      height\n      width\n    }\n    footerLogoRight {\n      url\n      height\n      width\n    }\n    socialMediaLinks {\n      url\n      name\n      id\n      iconName\n    }\n    footerLinks {\n      ... on LegalPageRecord {\n        id\n        slug\n        title\n        id\n      }\n    }\n  }\n  _site {\n    locales\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Layout {\n  _site {\n    faviconMetaTags {\n      attributes\n      content\n      tag\n    }\n  }\n}"): (typeof documents)["query Layout {\n  _site {\n    faviconMetaTags {\n      attributes\n      content\n      tag\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Locales {\n  _site {\n    locales\n  }\n}"): (typeof documents)["query Locales {\n  _site {\n    locales\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment DatoImage_responsiveImage on ResponsiveImage {\n  src\n  srcSet\n  base64\n  width\n  height\n  alt\n  title\n}"): (typeof documents)["fragment DatoImage_responsiveImage on ResponsiveImage {\n  src\n  srcSet\n  base64\n  width\n  height\n  alt\n  title\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment FeaturedDocumentationPages on DocumentationHomeRecord {\n  featuredPages {\n    id\n    ...FeaturedDocumentationPagesPreviewCard\n  }\n}\n\nfragment FeaturedDocumentationPagesPreviewCard on DocumentationPageRecord {\n  title\n  subtitle\n  slug\n}"): (typeof documents)["fragment FeaturedDocumentationPages on DocumentationHomeRecord {\n  featuredPages {\n    id\n    ...FeaturedDocumentationPagesPreviewCard\n  }\n}\n\nfragment FeaturedDocumentationPagesPreviewCard on DocumentationPageRecord {\n  title\n  subtitle\n  slug\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment PostExcerpt on PostRecord {\n  _publishedAt\n  slug\n  id\n  title\n  tags {\n    tag\n  }\n  seoTags {\n    description\n    image {\n      responsiveImage {\n        ...DatoImage_responsiveImage\n      }\n    }\n  }\n  author {\n    name\n    bio\n    slug\n    picture {\n      responsiveImage(imgixParams: {w: \"64\", h: \"64\", fit: crop}) {\n        ...DatoImage_responsiveImage\n      }\n    }\n  }\n}"): (typeof documents)["fragment PostExcerpt on PostRecord {\n  _publishedAt\n  slug\n  id\n  title\n  tags {\n    tag\n  }\n  seoTags {\n    description\n    image {\n      responsiveImage {\n        ...DatoImage_responsiveImage\n      }\n    }\n  }\n  author {\n    name\n    bio\n    slug\n    picture {\n      responsiveImage(imgixParams: {w: \"64\", h: \"64\", fit: crop}) {\n        ...DatoImage_responsiveImage\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment AccordionSection on AccordionSectionRecord {\n  title\n  items {\n    id\n    title\n    subtitle\n    text\n  }\n  bgColor {\n    hex\n  }\n  textColor {\n    hex\n  }\n}"): (typeof documents)["fragment AccordionSection on AccordionSectionRecord {\n  title\n  items {\n    id\n    title\n    subtitle\n    text\n  }\n  bgColor {\n    hex\n  }\n  textColor {\n    hex\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment BorderDivider on BorderDividerRecord {\n  borderImage {\n    url\n  }\n}"): (typeof documents)["fragment BorderDivider on BorderDividerRecord {\n  borderImage {\n    url\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CourseTableSection on CourseTableSectionRecord {\n  title\n  courses {\n    text\n  }\n  brochure {\n    url\n  }\n  buttonText\n}"): (typeof documents)["fragment CourseTableSection on CourseTableSectionRecord {\n  title\n  courses {\n    text\n  }\n  brochure {\n    url\n  }\n  buttonText\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment FeaturedContentSection on FeaturedContentSectionRecord {\n  title\n  features {\n    id\n    title\n    text\n    link {\n      slug\n    }\n  }\n  textColor {\n    hex\n  }\n  bgColor {\n    hex\n  }\n  image {\n    responsiveImage(imgixParams: {auto: format, w: 1152}) {\n      alt\n      src\n      width\n      height\n      sizes\n    }\n  }\n}"): (typeof documents)["fragment FeaturedContentSection on FeaturedContentSectionRecord {\n  title\n  features {\n    id\n    title\n    text\n    link {\n      slug\n    }\n  }\n  textColor {\n    hex\n  }\n  bgColor {\n    hex\n  }\n  image {\n    responsiveImage(imgixParams: {auto: format, w: 1152}) {\n      alt\n      src\n      width\n      height\n      sizes\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ImageHeroSection on ImageHeroSectionRecord {\n  bgImage {\n    responsiveImage(imgixParams: {auto: format, w: 1920}) {\n      alt\n      src\n      width\n      height\n      sizes\n    }\n  }\n  bgColor {\n    hex\n  }\n  useImageHeight\n}"): (typeof documents)["fragment ImageHeroSection on ImageHeroSectionRecord {\n  bgImage {\n    responsiveImage(imgixParams: {auto: format, w: 1920}) {\n      alt\n      src\n      width\n      height\n      sizes\n    }\n  }\n  bgColor {\n    hex\n  }\n  useImageHeight\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment LecturersSection on LecturersSectionRecord {\n  lecturersTitle: title\n  lecturers {\n    id\n    name\n    jobTitle\n    email\n    cvLink\n    category\n    biography\n    image {\n      responsiveImage(imgixParams: {auto: format, w: 400}) {\n        ...DatoImage_responsiveImage\n      }\n    }\n  }\n}"): (typeof documents)["fragment LecturersSection on LecturersSectionRecord {\n  lecturersTitle: title\n  lecturers {\n    id\n    name\n    jobTitle\n    email\n    cvLink\n    category\n    biography\n    image {\n      responsiveImage(imgixParams: {auto: format, w: 400}) {\n        ...DatoImage_responsiveImage\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment LogoCarouselSection on LogoCarouselSectionRecord {\n  logoCarouselTitle: title\n  cards {\n    id\n    name\n    image {\n      url\n      alt\n      height\n      width\n    }\n  }\n}"): (typeof documents)["fragment LogoCarouselSection on LogoCarouselSectionRecord {\n  logoCarouselTitle: title\n  cards {\n    id\n    name\n    image {\n      url\n      alt\n      height\n      width\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment PageImageTitleSection on PageImageTitleSectionRecord {\n  pageTitle: title\n  pageImage: image {\n    url\n    alt\n    height\n    width\n  }\n  bgColor {\n    hex\n  }\n  pageBgImage: bgImage {\n    responsiveImage(imgixParams: {auto: format, w: 1920}) {\n      alt\n      src\n      width\n      height\n      sizes\n    }\n  }\n}"): (typeof documents)["fragment PageImageTitleSection on PageImageTitleSectionRecord {\n  pageTitle: title\n  pageImage: image {\n    url\n    alt\n    height\n    width\n  }\n  bgColor {\n    hex\n  }\n  pageBgImage: bgImage {\n    responsiveImage(imgixParams: {auto: format, w: 1920}) {\n      alt\n      src\n      width\n      height\n      sizes\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SplitImageTextSection on SplitImageTextSectionRecord {\n  splitImageTitle: title\n  splitImageText: text\n  imageAlignment\n  bgColor {\n    hex\n  }\n  textColor {\n    hex\n  }\n  image {\n    responsiveImage(imgixParams: {auto: format, w: 793}) {\n      alt\n      src\n      width\n      height\n      sizes\n    }\n  }\n}"): (typeof documents)["fragment SplitImageTextSection on SplitImageTextSectionRecord {\n  splitImageTitle: title\n  splitImageText: text\n  imageAlignment\n  bgColor {\n    hex\n  }\n  textColor {\n    hex\n  }\n  image {\n    responsiveImage(imgixParams: {auto: format, w: 793}) {\n      alt\n      src\n      width\n      height\n      sizes\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment StaffSection on StaffSectionRecord {\n  staffTitle: title\n  bgColor {\n    hex\n  }\n  textColor {\n    hex\n  }\n  staff {\n    id\n    name\n    jobTitle\n    email\n    cvLink {\n      url\n    }\n    biography\n    image {\n      responsiveImage(imgixParams: {auto: format, w: 400}) {\n        alt\n        src\n        width\n        height\n        sizes\n      }\n    }\n  }\n}"): (typeof documents)["fragment StaffSection on StaffSectionRecord {\n  staffTitle: title\n  bgColor {\n    hex\n  }\n  textColor {\n    hex\n  }\n  staff {\n    id\n    name\n    jobTitle\n    email\n    cvLink {\n      url\n    }\n    biography\n    image {\n      responsiveImage(imgixParams: {auto: format, w: 400}) {\n        alt\n        src\n        width\n        height\n        sizes\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment TextSection on TextSectionRecord {\n  textSectionTitle: title\n  textSectionText: text\n  textBlockSize\n  bgColor {\n    hex\n  }\n  textColor {\n    hex\n  }\n}"): (typeof documents)["fragment TextSection on TextSectionRecord {\n  textSectionTitle: title\n  textSectionText: text\n  textBlockSize\n  bgColor {\n    hex\n  }\n  textColor {\n    hex\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;