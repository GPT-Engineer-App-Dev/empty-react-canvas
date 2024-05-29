import { useState } from "react";
import { Container, VStack, Button, Input, Box, Text, HStack } from "@chakra-ui/react";
import { useEvents, useAddEvent, useDeleteEvent, useUpdateEvent } from "../integrations/supabase/index.js";

const Index = () => {
  const { data: events, isLoading, isError } = useEvents();
  const addEvent = useAddEvent();
  const deleteEvent = useDeleteEvent();
  const updateEvent = useUpdateEvent();

  const [newEvent, setNewEvent] = useState({ name: "", date: "", description: "" });
  const [editingEvent, setEditingEvent] = useState(null);

  const handleAddEvent = () => {
    addEvent.mutate(newEvent);
    setNewEvent({ name: "", date: "", description: "" });
  };

  const handleDeleteEvent = (id) => {
    deleteEvent.mutate(id);
  };

  const handleUpdateEvent = (event) => {
    updateEvent.mutate(event);
    setEditingEvent(null);
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading events</Text>;

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Box>
          <Input
            placeholder="Event Name"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          />
          <Input
            placeholder="Event Date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <Input
            placeholder="Event Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          />
          <Button onClick={handleAddEvent}>Add Event</Button>
        </Box>
        {events.map((event) => (
          <Box key={event.id} borderWidth="1px" borderRadius="lg" p={4} width="100%">
            {editingEvent?.id === event.id ? (
              <>
                <Input
                  value={editingEvent.name}
                  onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                />
                <Input
                  value={editingEvent.date}
                  onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                />
                <Input
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                />
                <Button onClick={() => handleUpdateEvent(editingEvent)}>Save</Button>
                <Button onClick={() => setEditingEvent(null)}>Cancel</Button>
              </>
            ) : (
              <>
                <Text>{event.name}</Text>
                <Text>{event.date}</Text>
                <Text>{event.description}</Text>
                <HStack>
                  <Button onClick={() => setEditingEvent(event)}>Edit</Button>
                  <Button onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                </HStack>
              </>
            )}
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;