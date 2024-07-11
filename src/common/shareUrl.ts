/**
 * 인자로 받은 data를 OS 기본옵션으로 공유합니다.
 * 기본 공유옵션이 지원되지 않을 경우, url만을 클립보드에 링크를 복사하는 기능으로 대체됩니다.
 *
 * @param data 공유할 data 객체
 * @param data.url 공유될 또는 클립복드에 복사될 url
 * @param data.text 공유시 해당 메신저에 추가적인 텍스트로 전달되는 문구
 * @param data.title 공유시 썸네일에 제공되는 타이틀 문구
 * @param data.files 공유할 file 리스트

 */

export const shareUrl = async(data: ShareData): Promise<boolean> => {
  try {
    await navigator.share(data);
    return true;
  } catch {
    return false;
  }
};

export const copyUrl = async(text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};