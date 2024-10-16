import moment from 'moment';
import { showError, showSuccess } from '@/utils/dialog';
import TimeAgo from 'javascript-time-ago';
import vi from 'javascript-time-ago/locale/vi';

TimeAgo.addLocale(vi);

const timeAgo = new TimeAgo('vi');

export const delayMs = async (ms: number): Promise<boolean> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
};

export const showFileSize = (bytes: number): string => {
  if (bytes > 1024) {
    const kb = bytes / 1024;
    if (kb > 1024) {
      const mb = kb / 1024;
      if (mb > 1024) {
        const gb = kb / 1024;
        if (gb > 1024) {
          const tb = kb / 1024;
          return `${tb.toFixed(2).replace('.00', '')} TB`;
        }
        return `${gb.toFixed(2).replace('.00', '')} GB`;
      }
      return `${mb.toFixed(2).replace('.00', '')} MB`;
    }
    return `${kb.toFixed(2).replace('.00', '')} KB`;
  }
  return `${bytes} bytes`;
};

export const copyClipboardText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    showSuccess('Copied');
  } catch (e: any) {
    showError('Copy not support');
  }
};

export const getClipboardText = async (): Promise<string | undefined> => {
  try {
    return await navigator.clipboard.readText();
  } catch (e: any) {
    showError('Copy not support');
  }
};

export const formatDate = (value: number | Date | string, format = 'YYYY-MM-DD') => {
  return moment(value).format(format);
};

export const miniSecond2DateTime = (num: number) => {
  let delta = Math.floor(num / 1000);

  const days = Math.floor(delta / 86400);
  delta %= 86400;
  const hours = Math.floor(delta / 3600);
  delta %= 3600;
  const minutes = Math.floor(delta / 60);
  const seconds = delta % 60;

  return { days, hours, minutes, seconds };
};

const formatNumber = (n: number) => {
  return n < 10 ? `0${n}` : `${n}`;
};

export const millisecond2DateTimeShow = (num: number) => {
  const isNegative = num < 0;
  const { days, hours, minutes, seconds } = miniSecond2DateTime(isNegative ? -num : num);

  if (days >= 2) {
    return `${days} days`;
  } else if (days === 1) {
    return `${days} day, ${formatNumber(hours)}h`;
  } else if (hours > 0) {
    return `${hours}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
  } else {
    return `00:${formatNumber(minutes)}:${formatNumber(seconds)}`;
  }
};

export const millisecond2DateTimeShowVn = (num: number) => {
  const isNegative = num < 0;
  const { days, hours, minutes, seconds } = miniSecond2DateTime(isNegative ? -num : num);

  if (days >= 2) {
    return `${days} ngày`;
  } else if (days === 1) {
    return `${days} ngày, ${formatNumber(hours)}h`;
  } else if (hours > 0) {
    return `${hours}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
  } else {
    return `00:${formatNumber(minutes)}:${formatNumber(seconds)}`;
  }
};

export const miniSecond2DateTimeShow2 = (date: string) => {
  const now = Date.now();
  const time = new Date(date);
  return millisecond2DateTimeShow(time.getTime() - now);
};

export const dateTime2miniSecond = ({ days, hours, minutes, seconds }: { days: number; hours: number; minutes: number; seconds: number }) => {
  return (days * 86400 + hours * 3600 + minutes * 60 + seconds) * 1000;
};

export const getDateAgo = (date: string | number) => {
  if (!date) return '';
  return timeAgo.format(new Date(date)).replace('bây giờ', 'vừa xong');
};

export const getShortName = (name: string): string => {
  if (!name) return '';
  const nameTrim = name.trim().replace(/[ ]{2,}/g, ' ');
  const arr = nameTrim.split(' ');
  return `${arr[0][0].toUpperCase()}${arr[arr.length - 1][0].toUpperCase()}`;
};

export const toLowerCaseNonAccentVietnamese = (text: string): string => {
  let str = text.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
  return str;
};

export const getUserFromMessage = (message: string): string[] => {
  const dom = new DOMParser().parseFromString(message, 'text/html');
  const links = dom.querySelectorAll('a[data-id]');
  const userIds: string[] = [];

  if (links.length > 0) {
    links.forEach((a: Element) => {
      userIds.push(a.getAttribute('data-id') || '');
    });
  }

  return userIds;
};

export const add3Dots = (s: string, limit: number): string => {
  if (!s) return s;
  return s.length > limit ? s.substring(0, limit) + '...' : s;
};

export const randomIntMaxMin = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const textToFile = (content: string, filename: string): File => {
  // Tạo một Blob từ nội dung văn bản
  const blob = new Blob([content], { type: 'text/plain' });

  // Tạo đối tượng File từ Blob
  const file = new File([blob], filename, { type: 'text/plain' });

  return file;
};

export const FileMimeType: { [type: string]: string } = {
  'audio/x-mpeg': 'mpega',
  'application/postscript': 'ps',
  'audio/x-aiff': 'aiff',
  'application/x-aim': 'aim',
  'image/x-jg': 'art',
  'video/x-ms-asf': 'asx',
  'audio/basic': 'ulw',
  'video/x-msvideo': 'avi',
  'video/x-rad-screenplay': 'avx',
  'application/x-bcpio': 'bcpio',
  'application/octet-stream': 'exe',
  'image/bmp': 'dib',
  'text/html': 'html',
  'application/x-cdf': 'cdf',
  'application/pkix-cert': 'cer',
  'application/java': 'class',
  'application/x-cpio': 'cpio',
  'application/x-csh': 'csh',
  'text/css': 'css',
  'application/msword': 'doc',
  'application/xml-dtd': 'dtd',
  'video/x-dv': 'dv',
  'application/x-dvi': 'dvi',
  'application/vnd.ms-fontobject': 'eot',
  'text/x-setext': 'etx',
  'image/gif': 'gif',
  'application/x-gtar': 'gtar',
  'application/x-gzip': 'gz',
  'application/x-hdf': 'hdf',
  'application/mac-binhex40': 'hqx',
  'text/x-component': 'htc',
  'image/ief': 'ief',
  'text/vnd.sun.j2me.app-descriptor': 'jad',
  'application/java-archive': 'jar',
  'text/x-java-source': 'java',
  'application/x-java-jnlp-file': 'jnlp',
  'image/jpeg': 'jpg',
  'application/javascript': 'js',
  'text/plain': 'txt',
  'application/json': 'json',
  'audio/midi': 'midi',
  'application/x-latex': 'latex',
  'audio/x-mpegurl': 'm3u',
  'image/x-macpaint': 'pnt',
  'text/troff': 'tr',
  'application/mathml+xml': 'mathml',
  'application/x-mif': 'mif',
  'video/quicktime': 'qt',
  'video/x-sgi-movie': 'movie',
  'audio/mpeg': 'mpa',
  'video/mp4': 'mp4',
  'video/mpeg': 'mpg',
  'video/mpeg2': 'mpv2',
  'application/x-wais-source': 'src',
  'application/x-netcdf': 'nc',
  'application/oda': 'oda',
  'application/vnd.oasis.opendocument.database': 'odb',
  'application/vnd.oasis.opendocument.chart': 'odc',
  'application/vnd.oasis.opendocument.formula': 'odf',
  'application/vnd.oasis.opendocument.graphics': 'odg',
  'application/vnd.oasis.opendocument.image': 'odi',
  'application/vnd.oasis.opendocument.text-master': 'odm',
  'application/vnd.oasis.opendocument.presentation': 'odp',
  'application/vnd.oasis.opendocument.spreadsheet': 'ods',
  'application/vnd.oasis.opendocument.text': 'odt',
  'application/vnd.oasis.opendocument.graphics-template': 'otg',
  'application/vnd.oasis.opendocument.text-web': 'oth',
  'application/vnd.oasis.opendocument.presentation-template': 'otp',
  'application/vnd.oasis.opendocument.spreadsheet-template': 'ots',
  'application/vnd.oasis.opendocument.text-template': 'ott',
  'application/ogg': 'ogx',
  'video/ogg': 'ogv',
  'audio/ogg': 'spx',
  'application/x-font-opentype': 'otf',
  'audio/flac': 'flac',
  'application/annodex': 'anx',
  'audio/annodex': 'axa',
  'video/annodex': 'axv',
  'application/xspf+xml': 'xspf',
  'image/x-portable-bitmap': 'pbm',
  'image/pict': 'pict',
  'application/pdf': 'pdf',
  'image/x-portable-graymap': 'pgm',
  'audio/x-scpls': 'pls',
  'image/png': 'png',
  'image/x-portable-anymap': 'pnm',
  'image/x-portable-pixmap': 'ppm',
  'application/vnd.ms-powerpoint': 'pps',
  'image/vnd.adobe.photoshop': 'psd',
  'image/x-quicktime': 'qtif',
  'image/x-cmu-raster': 'ras',
  'application/rdf+xml': 'rdf',
  'image/x-rgb': 'rgb',
  'application/vnd.rn-realmedia': 'rm',
  'application/rtf': 'rtf',
  'text/richtext': 'rtx',
  'application/font-sfnt': 'sfnt',
  'application/x-sh': 'sh',
  'application/x-shar': 'shar',
  'application/x-stuffit': 'sit',
  'application/x-sv4cpio': 'sv4cpio',
  'application/x-sv4crc': 'sv4crc',
  'image/svg+xml': 'svgz',
  'application/x-shockwave-flash': 'swf',
  'application/x-tar': 'tar',
  'application/x-tcl': 'tcl',
  'application/x-tex': 'tex',
  'application/x-texinfo': 'texinfo',
  'image/tiff': 'tiff',
  'text/tab-separated-values': 'tsv',
  'application/x-font-ttf': 'ttf',
  'application/x-ustar': 'ustar',
  'application/voicexml+xml': 'vxml',
  'image/x-xbitmap': 'xbm',
  'application/xhtml+xml': 'xhtml',
  'application/vnd.ms-excel': 'xls',
  'application/xml': 'xsl',
  'image/x-xpixmap': 'xpm',
  'application/xslt+xml': 'xslt',
  'application/vnd.mozilla.xul+xml': 'xul',
  'image/x-xwindowdump': 'xwd',
  'application/vnd.visio': 'vsd',
  'audio/x-wav': 'wav',
  'image/vnd.wap.wbmp': 'wbmp',
  'text/vnd.wap.wml': 'wml',
  'application/vnd.wap.wmlc': 'wmlc',
  'text/vnd.wap.wmlsc': 'wmls',
  'application/vnd.wap.wmlscriptc': 'wmlscriptc',
  'video/x-ms-wmv': 'wmv',
  'application/font-woff': 'woff',
  'application/font-woff2': 'woff2',
  'model/vrml': 'wrl',
  'application/wspolicy+xml': 'wspolicy',
  'application/x-compress': 'z',
  'application/zip': 'zip',
  'text/yaml': 'yaml',
};
