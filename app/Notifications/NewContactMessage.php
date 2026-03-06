<?php

namespace App\Notifications;

use App\Models\ContactMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewContactMessage extends Notification
{
    use Queueable;

    public $contactMessage;

    /**
     * Create a new notification instance.
     */
    public function __construct(ContactMessage $contactMessage)
    {
        $this->contactMessage = $contactMessage;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Contact Request: ' . ($this->contactMessage->subject ?? 'No Subject'))
            ->greeting('Hello Admin,')
            ->line('You have received a new contact message from ' . $this->contactMessage->name . '.')
            ->line('Email: ' . $this->contactMessage->email)
            ->line('Message:')
            ->line($this->contactMessage->message)
            ->action('View Messages', url('/admin/messages'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'contact_message',
            'message_id' => $this->contactMessage->id,
            'name' => $this->contactMessage->name,
            'subject' => $this->contactMessage->subject,
        ];
    }
}
