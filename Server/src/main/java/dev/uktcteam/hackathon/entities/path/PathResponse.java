package dev.uktcteam.hackathon.entities.path;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PathResponse {
    private List<PathItemDto> path;
}
