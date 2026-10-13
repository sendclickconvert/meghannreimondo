export async function requireSaved(response: Response) {
  if (!response.ok || (await response.json()).ok !== true) throw new Error('submission_failed');
}

export function showSubmissionError(box: HTMLElement | null, email: string, subject: string, body = '') {
  if (!box) return;
  box.replaceChildren(document.createTextNode('We could not save your submission. Please try again, or '));
  const link = document.createElement('a');
  link.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  link.textContent = 'email the campaign directly';
  link.className = 'underline font-bold';
  box.append(link, document.createTextNode('.'));
  box.setAttribute('role', 'alert');
  box.classList.remove('hidden');
}
